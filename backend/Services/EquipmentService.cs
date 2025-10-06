using AutoMapper;
using backend.Config;
using backend.DTOs.EquipmentRental;
using backend.DTOs.Services;
using backend.Models;
using MongoDB.Driver;

namespace backend.Services
{
    public class EquipmentService
    {
        private readonly IMongoCollection<Equipment> _equipments;
        private readonly IMongoCollection<EquipmentVariant> _variants;
        private readonly IMongoCollection<EquipmentReservation> _reservations;
        private readonly IMapper _mapper;

        public EquipmentService(MongoDbService db, IMapper mapper)
        {
            _equipments = db.GetCollection<Equipment>("Equipment");
            _variants = db.GetCollection<EquipmentVariant>("EquipmentVariant");
            _reservations = db.GetCollection<EquipmentReservation>("EquipmentReservation");
            _mapper = mapper;
        }

        public async Task<List<EquipmentAvailableDto>> GetAvailableWithDetailsAsync(DateTime startDate, DateTime endDate)
        {
            if (startDate >= endDate)
            {
                throw new ArgumentException("Start date must be before end date");
            }

            var equipments = await _equipments.Find(_ => true).ToListAsync();
            var result = new List<EquipmentAvailableDto>();

            // Отримуємо всі резервації, які перетинаються з заданим періодом
            var overlappingReservations = await _reservations
                .Find(r => r.Status == "reserved" &&
                           r.StartDate < endDate &&
                           r.EndDate > startDate)
                .ToListAsync();

            foreach (var eq in equipments)
            {
                var dto = _mapper.Map<EquipmentAvailableDto>(eq);

                // Отримуємо всі варіанти (розміри) для цього обладнання
                var variants = await _variants
                    .Find(v => v.EquipmentId == eq.Id)
                    .ToListAsync();

                var availableSizes = new List<SizeQuantity>();
                int totalAvailable = 0;

                foreach (var variant in variants)
                {
                    // Підраховуємо скільки цього варіанту вже заброньовано
                    int reservedQty = 0;

                    foreach (var reservation in overlappingReservations)
                    {
                        // Шукаємо цей варіант в масиві equipmentVId резервації
                        var reservedItem = reservation.EquipmentVId?
                            .FirstOrDefault(item => item.EquipmentVId == variant.Id);

                        if (reservedItem != null)
                        {
                            reservedQty += reservedItem.Quantity;
                        }
                    }

                    // Рахуємо скільки залишилось вільних
                    int available = variant.Quantity - reservedQty;

                    // Якщо є вільні - додаємо цей розмір до списку
                    if (available > 0)
                    {
                        availableSizes.Add(new SizeQuantity
                        {
                            EquipmentVId = variant.Id,
                            Size = variant.Size,
                            Quantity = available
                        });
                        totalAvailable += available;
                    }
                }

                // Додаємо обладнання до результату тільки якщо є хоч якісь вільні варіанти
                if (totalAvailable > 0)
                {
                    dto.AvailableSizes = availableSizes;
                    dto.TotalQuantityAvailable = totalAvailable;
                    result.Add(dto);
                }
            }

            return result;
        }

        public async Task<ServiceResult<EquipmentReservationDto>> CreateEquipmentReservationAsync(EquipmentReservationDto dto, string userId)
        {
            if (dto.CheckIn >= dto.CheckOut)
                return ServiceResult<EquipmentReservationDto>.Fail("Check-in date must be earlier than check-out date.");

            if (dto.EquipmentVariants == null || !dto.EquipmentVariants.Any())
                return ServiceResult<EquipmentReservationDto>.Fail("EquipmentVariants cannot be empty.");

            // Отримуємо всі резервації, які перетинаються з заданим періодом
            var overlappingReservations = await _reservations
                .Find(r => r.Status == "reserved" &&
                           r.StartDate < dto.CheckOut &&
                           r.EndDate > dto.CheckIn)
                .ToListAsync();

            // Перевіряємо кожний обраний варіант обладнання
            foreach (var eqVariant in dto.EquipmentVariants)
            {
                int reservedQty = overlappingReservations
                    .SelectMany(r => r.EquipmentVId)
                    .Where(v => v.EquipmentVId == eqVariant.EquipmentVId)
                    .Sum(v => v.Quantity);

                var variant = await _variants
                    .Find(v => v.Id == eqVariant.EquipmentVId)
                    .FirstOrDefaultAsync();

                if (variant == null)
                    return ServiceResult<EquipmentReservationDto>.Fail($"Variant {eqVariant.EquipmentVId} not found.");

                if (reservedQty + eqVariant.Quantity > variant.Quantity)
                    return ServiceResult<EquipmentReservationDto>.Fail($"Not enough equipment for variant {variant.Id}.");
            }

            // Шукаємо чи є вже резервація користувача на ці дати
            var checkIn = dto.CheckIn.Date;
            var checkOut = dto.CheckOut.Date;

            var existingReservation = await _reservations
                .Find(r => r.UserId == userId &&
                           r.Status == "reserved" &&
                           r.StartDate.Date == checkIn &&
                           r.EndDate.Date == checkOut)
                .FirstOrDefaultAsync();


            if (existingReservation != null)
            {
                // додаємо обладнання до існуючої резервації
                foreach (var eqVariant in dto.EquipmentVariants)
                {
                    var existingEq = existingReservation.EquipmentVId
                        .FirstOrDefault(v => v.EquipmentVId == eqVariant.EquipmentVId);

                    if (existingEq != null)
                    {
                        existingEq.Quantity += eqVariant.Quantity;
                    }
                    else
                    {
                        existingReservation.EquipmentVId.Add(_mapper.Map<backend.Models.EquipmentsQuantity>(eqVariant));
                    }
                }

                await _reservations.ReplaceOneAsync(r => r.Id == existingReservation.Id, existingReservation);
            }
            else
            {
                // створюємо нову резервацію
                var reservation = _mapper.Map<EquipmentReservation>(dto);
                reservation.UserId = userId;
                await _reservations.InsertOneAsync(reservation);
            }

            return ServiceResult<EquipmentReservationDto>.Ok(dto);
        }

        public async Task<List<EquipmentsUserDto>> GetUserReservationsAsync(string? userId)
        {
            var reservations = await _reservations
                .Find(r => r.UserId == userId && r.Status == "reserved")
                .ToListAsync();

            if (!reservations.Any())
                return new List<EquipmentsUserDto>();

            // Завантажуємо всі варіанти, які зустрічаються у резерваціях
            var allVariantIds = reservations
                .SelectMany(r => r.EquipmentVId)
                .Select(eq => eq.EquipmentVId)
                .Distinct()
                .ToList();

            var variants = await _variants
                .Find(v => allVariantIds.Contains(v.Id))
                .ToListAsync();

            // Завантажуємо обладнання, яке використовується
            var allEquipmentIds = variants.Select(v => v.EquipmentId).Distinct().ToList();
            var equipments = await _equipments
                .Find(e => allEquipmentIds.Contains(e.Id))
                .ToListAsync();

            // Створюємо словники для швидкого доступу
            var variantDict = variants.ToDictionary(v => v.Id);
            var equipmentDict = equipments.ToDictionary(e => e.Id);

            var result = new List<EquipmentsUserDto>();

            foreach (var res in reservations)
            {
                foreach (var eqQuantity in res.EquipmentVId)
                {
                    if (!variantDict.TryGetValue(eqQuantity.EquipmentVId, out var variant))
                        continue;
                    if (!equipmentDict.TryGetValue(variant.EquipmentId!, out var equipment))
                        continue;

                    // Мапимо через AutoMapper
                    var dto = _mapper.Map<EquipmentsUserDto>((res, eqQuantity, variant, equipment));
                    result.Add(dto);
                }
            }

            return result;
        }

    }
}
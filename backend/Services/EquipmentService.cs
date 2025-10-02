using AutoMapper;
using backend.Config;
using backend.DTOs.EquipmentRental;
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
    }
}
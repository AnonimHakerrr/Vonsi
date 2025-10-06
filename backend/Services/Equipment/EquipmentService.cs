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
        public EquipmentService(MongoDbService db , IMapper mapper)
        {
            _equipments = db.GetCollection<Equipment>("Equipment");
            _variants = db.GetCollection<EquipmentVariant>("EquipmentVariant");
            _reservations = db.GetCollection<EquipmentReservation>("EquipmentReservation");
            _mapper = mapper;
        }

        public async Task<List<EquipmentAvailableDto>> GetAvailableWithDetailsAsync( DateTime startDate, DateTime endDate)
        {
            if (startDate >= endDate)
    {
        throw new ArgumentException("Start date must be before end date");
    }
            var equipments = await _equipments.Find(_ => true).ToListAsync();
            var result = new List<EquipmentAvailableDto>();
            
            foreach (var eq in equipments)
            {
                var dto = _mapper.Map<EquipmentAvailableDto>(eq);

                var variants = await _variants
                    .Find(v => v.EquipmentId == eq.Id)
                    .ToListAsync();
                Console.WriteLine($"Equipment {eq.Id} has {variants.Count} variants.");
                var sizes = new List<string>();
                int totalAvailable = 0;

                foreach (var v in variants)
                {
                    var reserved = await _reservations
                        .Find(r => r.EquipmentVId == v.Id && r.Status == "reserved" &&
                      r.StartDate < endDate && 
                      r.EndDate > startDate)
                        .ToListAsync();

                    int reservedQty = reserved.Count;
                     int available = v.Quantity - reservedQty;

                    if (available > 0)
                    {
                        sizes.Add(v.Size);
                        totalAvailable += available;
                    }
                    }

                if (totalAvailable > 0)
                {
                    dto.Sizes = sizes;
                    dto.QuantityAvailable = totalAvailable;
                    result.Add(dto);
                }
            }

            return result;
        }
    }
}

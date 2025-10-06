using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class EquipmentsQuantity
    {
        [BsonElement("id")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? EquipmentVId { get; set; } = null!;
        [BsonElement("quantity")]
        public int Quantity { get; set; }
    }
    public class EquipmentReservation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("equipmentVId")]
        public List<EquipmentsQuantity>? EquipmentVId { get; set; } = new List<EquipmentsQuantity>();

        [BsonElement("userId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? UserId { get; set; }

        [BsonElement("startDate")]
        public DateTime StartDate { get; set; }

        [BsonElement("endDate")]
        public DateTime EndDate { get; set; }

        [BsonElement("status")]
        public string Status { get; set; } = "reserved";

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

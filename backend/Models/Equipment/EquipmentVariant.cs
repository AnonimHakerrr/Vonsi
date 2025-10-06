using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class EquipmentVariant
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("equipmentId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? EquipmentId { get; set; }
        [BsonElement("size")]
        public string Size { get; set; }
        [BsonElement("quantity")]
        public int Quantity { get; set; }

        [BsonElement("weightRange")]
        public string WeightRange { get; set; }
        [BsonElement("heightRange")]
        public string HeightRange { get; set; }
        [BsonElement("skillLevel")]
        public string SkillLevel { get; set; }
    }
}
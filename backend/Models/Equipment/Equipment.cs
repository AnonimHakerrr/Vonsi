using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    [BsonIgnoreExtraElements] 
    public class Equipment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("type")]
        public string? Type { get; set; }
        [BsonElement("brand")]
        public string? Brand { get; set; }
        [BsonElement("description")]
        public string? Description { get; set; }
        [BsonElement("pricePerDay")]
        public decimal PricePerDay { get; set; }
        [BsonElement("rating")]
        public double Rating { get; set; }
        [BsonElement("images")]
        public List<string> Images { get; set; }
    }
}
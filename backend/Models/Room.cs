using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{ 
    public class Room
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("title")]
        public string Title { get; set; } = null!;

        [BsonElement("description")]
        public string? Description { get; set; }

        [BsonElement("pricePerNight")]
        public decimal PricePerNight { get; set; }

        [BsonElement("capacity")]
        public int Capacity { get; set; }

        [BsonElement("createdAt")]
        public string Type { get; set; } = "standard" ?? "deluxe" ?? "suite";
        [BsonElement("imagesUrl")]
        public List<string> ImagesUrl { get; set; } = new();
        [BsonElement("amenities")]
        public List<string> Amenities { get; set; } = new();

        [BsonElement("isAvailable")]
        public bool IsAvailable { get; set; } = true;
    }
}
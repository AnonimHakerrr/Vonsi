using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class RoomDetails
    {
        [BsonElement("roomNumber")]
        public string RoomNumber { get; set; } = null!;

        [BsonElement("floor")]
        public string Floor { get; set; } = null!;

        [BsonElement("size")]
        public string Size { get; set; } = null!;

        [BsonElement("bedType")]
        public string BedType { get; set; } = null!;
    }

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

        [BsonElement("type")]
        public string Type { get; set; } = "standard";

        [BsonElement("images")]
        public List<string> Images { get; set; } = new List<string>();

        [BsonElement("amenities")]
        public List<string> Amenities { get; set; } = new List<string>();

        [BsonElement("isAvailable")]
        public bool IsAvailable { get; set; } = true;

        [BsonElement("details")]
        public RoomDetails? Details { get; set; } 
    }
}

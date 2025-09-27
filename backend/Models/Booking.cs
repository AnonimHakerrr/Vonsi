using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
namespace backend.Models
{


    public class Booking
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("userId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; } = null!;

        [BsonElement("roomsId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? RoomId { get; set; }

        [BsonElement("checkIn")]
        public DateTime CheckIn { get; set; }

        [BsonElement("checkOut")]
        public DateTime CheckOut { get; set; }

        [BsonElement("status")]
        public string? Status { get; set; }  = "pending";
        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}
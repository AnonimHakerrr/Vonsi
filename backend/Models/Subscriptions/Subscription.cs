using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace backend.Models
{
    [BsonIgnoreExtraElements]
    public class Subscription
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; } = null!;

        [BsonElement("description")]
        public string Description { get; set; } = null!;

        [BsonElement("price")]
        public decimal Price { get; set; }

        [BsonElement("durationDays")]
        public int DurationDays { get; set; }

        [BsonElement("features")]
        public List<string> Features { get; set; } = new();

        [BsonElement("popular")]
        public bool Popular { get; set; } = false;
    }
}

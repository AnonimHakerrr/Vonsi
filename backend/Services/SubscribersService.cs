using backend.Config;
using backend.DTOs.Subscribers;
using backend.Models;
using MongoDB.Driver;

namespace backend.Services
{
    public class SubscribersService
    {
        private readonly IMongoCollection<Subscribers> _subscribers;
        private readonly MongoDbService _db;

        public SubscribersService(MongoDbService db)
        {
            _db = db;
            _subscribers = _db.GetCollection<Subscribers>("UserSubscription");
        }

        public async Task<Subscribers> AddSubscriberAsync(SubscribersDto dto)
        {
            var newSub = new Subscribers
            {
                SubscriptionId = dto.SubscriptionId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Status = "active",
                CreatedAt = DateTime.UtcNow
            };

            await _subscribers.InsertOneAsync(newSub);
            return newSub;
        }
    }
}

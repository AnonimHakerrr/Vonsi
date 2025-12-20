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

        // Додати абонемент для конкретного користувача
        public async Task<Subscribers> AddSubscriberAsync(SubscribersDto dto, string userId)
        {
            Console.WriteLine(dto.StartDate);
            Console.WriteLine(dto.EndDate);
            var newSub = new Subscribers
            {
                UserId = userId,
                SubscriptionId = dto.SubscriptionId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Status = "active",
                CreatedAt = DateTime.UtcNow
            };

            await _subscribers.InsertOneAsync(newSub);
            return newSub;
        }

        // Отримати всі абонементи конкретного користувача
        public async Task<List<Subscribers>> GetSubscriptionsByUserIdAsync(string userId)
        {
            return await _subscribers.Find(s => s.UserId == userId).ToListAsync();
        }
    }
}

using backend.Config;
using backend.DTOs.Subscriptions;
using backend.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public class SubscriptionService
    {
        private readonly IMongoCollection<Subscription> _subscriptions;

        public SubscriptionService(MongoDbService db)
        {
            _subscriptions = db.GetCollection<Subscription>("Subscription");
        }

        public async Task<List<SubscriptionDto>> GetAllSubscriptionsAsync()
        {
            var subs = await _subscriptions.Find(_ => true).ToListAsync();

            return subs.Select(s => new SubscriptionDto
            {
                Id = s.Id,
                Name = s.Name,
                Description = s.Description,
                Price = s.Price,
                DurationDays = s.DurationDays,
                Features = s.Features ?? new List<string>(),
                Popular = s.Popular
            }).ToList();
        }
    }
}

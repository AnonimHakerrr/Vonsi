using backend.Config;
using backend.DTOs.Subscribers;
using backend.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    // Сервіс-запит для отримання підписок користувача (для кабінету)
    public class UserSubscriptionsService
    {
        private readonly IMongoCollection<Subscribers> _userSubscriptions;
        private readonly IMongoCollection<Subscription> _subscriptions;

        public UserSubscriptionsService(MongoDbService db)
        {
            _userSubscriptions = db.GetCollection<Subscribers>("UserSubscription");
            _subscriptions = db.GetCollection<Subscription>("Subscription");
        }

        public async Task<List<UserSubscriptionViewDto>> GetUserSubscriptionsForDashboardAsync(string userId)
        {
            var userSubs = await _userSubscriptions.Find(us => us.UserId == userId).ToListAsync();

            var subscriptionIds = userSubs
                .Select(u => u.SubscriptionId)
                .Where(id => !string.IsNullOrEmpty(id))
                .Distinct()
                .ToList();

            var catalog = new List<Subscription>();
            if (subscriptionIds.Count > 0)
            {
                var filter = Builders<Subscription>.Filter.In(s => s.Id, subscriptionIds);
                catalog = await _subscriptions.Find(filter).ToListAsync();
            }

            var catalogById = catalog.ToDictionary(c => c.Id!, c => c);

            var result = userSubs.Select(us =>
            {
                if (catalogById.TryGetValue(us.SubscriptionId, out var cat))
                {
                    return new UserSubscriptionViewDto
                    {
                        SubscriptionId = us.SubscriptionId,
                        Name = cat.Name,
                        Description = cat.Description,
                        Price = cat.Price,
                        DurationDays = cat.DurationDays,
                        StartDate = us.StartDate,
                        EndDate = us.EndDate,
                        Status = us.Status,
                        CreatedAt = us.CreatedAt
                    };
                }

                return new UserSubscriptionViewDto
                {
                    SubscriptionId = us.SubscriptionId,
                    Name = string.Empty,
                    Description = string.Empty,
                    Price = 0m,
                    DurationDays = 0,
                    StartDate = us.StartDate,
                    EndDate = us.EndDate,
                    Status = us.Status,
                    CreatedAt = us.CreatedAt
                };
            }).ToList();

            return result;
        }
    }
}

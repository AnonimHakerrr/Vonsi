using backend.Config;
using backend.DTOs.Subscribers;
using backend.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;

namespace backend.Services
{
    public class UserSubscriptionsService
    {
        private readonly IMongoCollection<Subscribers> _userSubs;
        private readonly IMongoCollection<Subscription> _subscriptions;
        private readonly IMapper _mapper;

        public UserSubscriptionsService(MongoDbService db, IMapper mapper)
        {
            _userSubs = db.GetCollection<Subscribers>("UserSubscription");
            _subscriptions = db.GetCollection<Subscription>("Subscription");
            _mapper = mapper;
        }

        public async Task<List<UserSubscriptionViewDto>> GetUserSubscriptionsForDashboardAsync(string userId)
        {
            var userSubs = await _userSubs.Find(s => s.UserId == userId).ToListAsync();

            var subsIds = userSubs.ConvertAll(s => s.SubscriptionId);
            var subscriptions = await _subscriptions.Find(s => subsIds.Contains(s.Id!)).ToListAsync();

            var result = new List<UserSubscriptionViewDto>();

            foreach (var userSub in userSubs)
            {
                var dto = _mapper.Map<UserSubscriptionViewDto>(userSub);

                var subscription = subscriptions.Find(s => s.Id == userSub.SubscriptionId);
                if (subscription != null)
                {
                    _mapper.Map(subscription, dto);
                }

                result.Add(dto);
            }

            return result;
        }
    }
}

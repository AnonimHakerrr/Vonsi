using AutoMapper;
using backend.Models;
using backend.DTOs.Subscriptions;

namespace backend.Helpers
{
    public class SubscriptionProfile : Profile
    {
        public SubscriptionProfile()
        {
            CreateMap<Subscription, SubscriptionDto>();
        }
    }
}

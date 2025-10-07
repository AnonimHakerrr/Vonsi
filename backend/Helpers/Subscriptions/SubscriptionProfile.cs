using AutoMapper;
using backend.Models;
using backend.DTOs.Subscriptions;

namespace backend.Helpers
{
    public class SubscriptionProfile : Profile
    {
        public SubscriptionProfile()
        {
            CreateMap<Subscription, SubscriptionDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.Description, opt => opt.MapFrom(s => s.Description))
                .ForMember(d => d.Price, opt => opt.MapFrom(s => s.Price))
                .ForMember(d => d.DurationDays, opt => opt.MapFrom(s => s.DurationDays))
                .ForMember(d => d.Features, opt => opt.MapFrom(s => s.Features))
                .ForMember(d => d.Popular, opt => opt.MapFrom(s => s.Popular))
                .ReverseMap();
        }
    }
}

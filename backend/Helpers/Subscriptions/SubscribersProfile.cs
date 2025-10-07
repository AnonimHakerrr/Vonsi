using AutoMapper;
using backend.Models;
using backend.DTOs.Subscribers;

namespace backend.Helpers
{
    public class SubscribersProfile : Profile
    {
        public SubscribersProfile()
        {
            CreateMap<Subscribers, SubscribersDto>()
                .ForMember(d => d.SubscriptionId, opt => opt.MapFrom(s => s.SubscriptionId))
                .ForMember(d => d.StartDate, opt => opt.MapFrom(s => s.StartDate))
                .ForMember(d => d.EndDate, opt => opt.MapFrom(s => s.EndDate));
        }
    }
}

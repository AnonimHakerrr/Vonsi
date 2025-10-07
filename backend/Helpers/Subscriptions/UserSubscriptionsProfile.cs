using AutoMapper;
using backend.Models;
using backend.DTOs.Subscribers;

namespace backend.Helpers
{
    public class UserSubscriptionsProfile : Profile
    {
        public UserSubscriptionsProfile()
        {
            CreateMap<Subscribers, UserSubscriptionViewDto>()
                .ForMember(dest => dest.SubscriptionId, opt => opt.MapFrom(src => src.SubscriptionId))
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndDate))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
                
                .ForMember(dest => dest.Name, opt => opt.Ignore())
                .ForMember(dest => dest.Description, opt => opt.Ignore())
                .ForMember(dest => dest.Price, opt => opt.Ignore())
                .ForMember(dest => dest.DurationDays, opt => opt.Ignore());

            
            CreateMap<Subscription, UserSubscriptionViewDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.DurationDays, opt => opt.MapFrom(src => src.DurationDays));
        }
    }
}

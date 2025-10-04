using AutoMapper;
using backend.Models;             // модель Subscribers
using backend.DTOs.Subscribers;  // тут SubscribersDto

namespace backend.Helpers
{
    public class SubscribersProfile : Profile
    {
        public SubscribersProfile()
        {
            // Мапування Subscribers -> SubscribersDto
            CreateMap<Subscribers, SubscribersDto>();
        }
    }
}

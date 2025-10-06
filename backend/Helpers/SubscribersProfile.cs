using AutoMapper;
using backend.Models;            
using backend.DTOs.Subscribers;  

namespace backend.Helpers
{
    public class SubscribersProfile : Profile
    {
        public SubscribersProfile()
        {
            CreateMap<Subscribers, SubscribersDto>();
        }
    }
}

using AutoMapper;
using backend.DTOs.EquipmentRental;
using backend.Models;

namespace backend.Helpers
{
    public class EquipmentProfile : Profile
    {
        public EquipmentProfile()
        {
            CreateMap<Equipment, EquipmentAvailableDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.brand, opt => opt.MapFrom(src => src.Brand))
                .ForMember(dest => dest.rating, opt => opt.MapFrom(src => src.Rating))
                .ForMember(dest => dest.PricePerDay, opt => opt.MapFrom(src => src.PricePerDay))
                .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Sizes, opt => opt.Ignore())   // ми підраховуємо в сервісі
                .ForMember(dest => dest.QuantityAvailable, opt => opt.Ignore()); // теж підрахунок у сервісі
        }
    }
}
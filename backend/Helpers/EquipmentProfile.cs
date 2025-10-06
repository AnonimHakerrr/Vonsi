using AutoMapper;
using backend.DTOs.EquipmentRental;
using backend.Models;
using EquipmentsQuantity = backend.Models.EquipmentsQuantity;

namespace backend.Helpers
{
    public class EquipmentProfile : Profile
    {
        public EquipmentProfile()
        {
            CreateMap<Equipment, EquipmentAvailableDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.Brand, opt => opt.MapFrom(src => src.Brand))
                .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Rating))
                .ForMember(dest => dest.PricePerDay, opt => opt.MapFrom(src => src.PricePerDay))
                .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.AvailableSizes, opt => opt.Ignore())   // ми підраховуємо в сервісі
                .ForMember(dest => dest.TotalQuantityAvailable, opt => opt.Ignore()); // теж підрахунок у сервісі


            // Мапінг DTO -> Model для EquipmentsQuantity
            CreateMap<DTOs.EquipmentRental.EquipmentsQuantity, Models.EquipmentsQuantity>()
                .ForMember(dest => dest.EquipmentVId, opt => opt.MapFrom(src => src.EquipmentVId))
                .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity));

            // Мапінг для створення резервації
            CreateMap<EquipmentReservationDto, EquipmentReservation>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore()) // встановлюємо в сервісі
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.CheckIn))
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.CheckOut))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => "reserved"))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.EquipmentVId, opt => opt.MapFrom(src => src.EquipmentVariants));

            CreateMap<(EquipmentReservation reservation, EquipmentsQuantity eqQuantity, EquipmentVariant variant, Equipment equipment), EquipmentsUserDto>()
         .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.equipment.Type))
         .ForMember(dest => dest.Brand, opt => opt.MapFrom(src => src.equipment.Brand))
         .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.equipment.Description))
         .ForMember(dest => dest.PricePerDay, opt => opt.MapFrom(src => src.equipment.PricePerDay))
         .ForMember(dest => dest.Size, opt => opt.MapFrom(src => src.variant.Size))
         .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.eqQuantity.Quantity))
         .ForMember(dest => dest.CheckIn, opt => opt.MapFrom(src => src.reservation.StartDate))
         .ForMember(dest => dest.CheckOut, opt => opt.MapFrom(src => src.reservation.EndDate));

        }
    }
}
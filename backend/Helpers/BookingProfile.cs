using AutoMapper;
using backend.DTOs.Booking;
using backend.Models;

namespace backend.Helpers
{
    public class BookingProfile : Profile
    {
        public BookingProfile()
        {
           CreateMap<CreateBookingDto, Booking>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Status, opt => opt.MapFrom(_ => "confirmed"))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow));

            CreateMap<Booking, BookingResponseDto>();
        }
    }
}

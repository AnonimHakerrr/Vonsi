using AutoMapper;
using backend.Models;
using backend.DTOs.Booking;

namespace backend.Mappers
{
    public class RoomsProfile : Profile
    {
        public RoomsProfile()
        {
            CreateMap<RoomDetails, RoomDetailsDto>();
            CreateMap<Room, RoomDto>();
        }
    }
}

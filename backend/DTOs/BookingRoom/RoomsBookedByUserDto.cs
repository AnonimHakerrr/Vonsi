
namespace backend.DTOs.Booking
{
    public class RoomsBookedByUserDto
    {
        public RoomDto Room { get; set; } = null!;
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
    }
}
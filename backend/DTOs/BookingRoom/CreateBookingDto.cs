namespace backend.DTOs.Booking
{
    public class CreateBookingDto
    {
        public string RoomId { get; set; } = string.Empty;
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
    }
}


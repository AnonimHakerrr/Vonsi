using System;

namespace backend.DTOs.Booking
{
    public class BookingResponseDto
    {
        public string Id { get; set; } = null!;
        public string RoomId { get; set; } = null!;
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public string UserId { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Booking
{
    public class RoomDto
    {
        [Required]
        public string? Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public decimal PricePerNight { get; set; }
        public int Capacity { get; set; }
        public string Type { get; set; }
        public List<string> Images { get; set; } = new();
        public List<string> Amenities { get; set; } = new();
        public RoomDetailsDto? Details { get; set; } = null!;
    }
}

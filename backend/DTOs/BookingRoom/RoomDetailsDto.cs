namespace backend.DTOs.Booking
{
    public class RoomDetailsDto
    {
        public string RoomNumber { get; set; } = null!;
        public string Floor { get; set; } = null!;
        public string Size { get; set; } = null!;
        public string BedType { get; set; } = null!;
    }
}
namespace backend.DTOs.EquipmentRental
{
    public class EquipmentReservationDto
    {
        public string Id { get; set; } = null!;
        public string EquipmentVariantId { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public string Status { get; set; } = "reserved";
        public DateTime CreatedAt { get; set; }
    }
}
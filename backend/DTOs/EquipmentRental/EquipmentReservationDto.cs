namespace backend.DTOs.EquipmentRental
{
    public class EquipmentsQuantity
    {
        public string? EquipmentVId { get; set; } = null!;
        public int Quantity { get; set; }
    }
    public class EquipmentReservationDto
    {
        public List<EquipmentsQuantity> EquipmentVariants { get; set; } = null!;
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
    }
}
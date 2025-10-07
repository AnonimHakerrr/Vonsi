namespace backend.DTOs.EquipmentRental
{
    public class EquipmentsUserDto
    {
        public string Type { get; set; } = null!;
        public string Brand { get; set; } = null!;
        public string Description { get; set; } = null!;
        public decimal PricePerDay { get; set; }
        public string Size { get; set; } = null!;
        public int Quantity { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
    }
}
namespace backend.DTOs.EquipmentRental
{
    public class SizeQuantity
    {
        public string? EquipmentVId { get; set; } = null!;
        public string Size { get; set; } = null!;
        public int Quantity { get; set; }
    }

    public class EquipmentAvailableDto
    {
        public string? Id { get; set; }
        public string Type { get; set; } = null!;
        public string Brand { get; set; } = null!;
        public double Rating { get; set; }
        public string Description { get; set; } = null!;
        public decimal PricePerDay { get; set; }
        public List<SizeQuantity> AvailableSizes { get; set; } = new();
        public int TotalQuantityAvailable { get; set; }
        public List<string> Images { get; set; } = new();
    }

}
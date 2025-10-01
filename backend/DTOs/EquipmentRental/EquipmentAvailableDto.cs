namespace backend.DTOs.EquipmentRental
{
    public class EquipmentAvailableDto
    {
        public string? Id { get; set; }
        public string type { get; set; } = null!;
        public string brand { get; set; } = null!;
        public double rating { get; set; }  
        public string Description { get; set; }  
        public decimal PricePerDay { get; set; } 
        public List<string> Sizes { get; set; } = new();
        public int QuantityAvailable { get; set; } 
        public List<string> Images { get; set; } = new();
    }
}
using System;

namespace backend.DTOs.Subscribers
{
    public class SubscribersDto
    {
        public string SubscriptionId { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}

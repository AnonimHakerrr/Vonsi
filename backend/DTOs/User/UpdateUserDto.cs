using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.User
{
    public class UpdateUserDto
    {
        [Phone]
        public string? Phone { get; set; } = null!;
        [EmailAddress]
        public string? Email { get; set; } = null!;
        public string? FirstName { get; set; } = null!;
        public string? LastName { get; set; } = null!;
    }
}

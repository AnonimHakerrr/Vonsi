using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.User
{
    public class InfoUserDto
    {
        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }

        [Phone(ErrorMessage = "Invalid phone number")]
        public string Phone { get; set; }

        [Url(ErrorMessage = "Photo must be a valid URL")]
        public string PhotoUrl { get; set; }
    }
}
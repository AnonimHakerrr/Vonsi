using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.User
{
    public class SignUpDto
    {
        public string Phone { get; set; } = null!;
        [Required, MinLength(6)]
        public string Password { get; set; } = null!;
        [Required, MinLength(6)]
        public string PasswordConfirm { get; set; } = null!;
        [Required, EmailAddress]
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
    }
}
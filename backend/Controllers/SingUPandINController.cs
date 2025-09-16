using backend.DTOs;
using backend.DTOs.User;
using backend.Helpers;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly JwtService _jwtService;

        public AuthController(UserService userService, JwtService jwtService)
        {
            _userService = userService;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(SignUpDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.FirstName) || string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest("First name and password required.");

        
            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                PasswordHash = PasswordHasher.Hash(dto.Password)
            };

            await _userService.CreateAsync(user);

            return Ok(new UserResponseDto { Id = user.Id, FirstName = user.FirstName, LastName = user.LastName });
        }
 
    }
}

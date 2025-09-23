using backend.DTOs;
using backend.DTOs.User;
using backend.Helpers;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;


namespace backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly JwtService _jwtService;
        private readonly IMapper _mapper;

        public AuthController(UserService userService, JwtService jwtService, IMapper mapper)
        {
            _userService = userService;
            _jwtService = jwtService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] SignUpDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (dto.Password != dto.PasswordConfirm)
                return BadRequest("Passwords do not match");

            var existingPhoneUser = await _userService.GetByPhoneAsync(dto.Phone);
            if (existingPhoneUser != null)
                return Conflict("User with this phone number already exists");

            var existingEmailUser = await _userService.GetByEmailAsync(dto.Email);
            if (existingEmailUser != null)
                return Conflict("User with this email already exists");

            // 🔹 AutoMapper -> User
            var user = _mapper.Map<User>(dto);

            await _userService.CreateAsync(user);

            // 🔹 Генеруємо JWT токен
            var token = _jwtService.GenerateToken(user);

            // 🔹 Створюємо DTO для відповіді
            var response = _mapper.Map<UserResponseDto>(user);
            response.Token = token;

            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] SignInDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userService.GetByEmailAsync(dto.Email);
            if (user == null)
                return Unauthorized("Invalid email or password");

            if (!PasswordHasher.Verify(dto.Password, user.PasswordHash))
                return Unauthorized("Invalid email or password");

            // Генеруємо JWT токен
            var token = _jwtService.GenerateToken(user);

            // Мапимо у DTO
            var response = _mapper.Map<UserResponseDto>(user);
            response.Token = token;

            return Ok(response);
        }
    }
}

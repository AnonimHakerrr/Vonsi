using backend.DTOs.User;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UpdateUserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly IMapper _mapper;

        public UpdateUserController(UserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPut("me")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateMyProfile([FromForm] UpdateUserDto dto, IFormFile? photo)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var updatedUser = await _userService.UpdateUserAsync(userId, dto, photo);

            if (updatedUser == null)
                return BadRequest("Немає даних для оновлення");

            return Ok(updatedUser);
        }

    }
}
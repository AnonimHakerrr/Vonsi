using Microsoft.AspNetCore.Authorization;
using backend.DTOs.Subscribers;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using AutoMapper;

namespace backend.Controllers.Equipment
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SubscribersController : ControllerBase
    {
        private readonly SubscribersService _subscribersService;
        private readonly IMapper _mapper;

        public SubscribersController(SubscribersService subscribersService, IMapper mapper)
        {
            _subscribersService = subscribersService;
            _mapper = mapper;
        }

        [HttpPost("addSubscription")]
        public async Task<IActionResult> AddSubscription([FromBody] SubscribersDto dto)
        {
             Console.WriteLine(dto.StartDate);
            Console.WriteLine(dto.EndDate);
            var userId = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                         ?? User?.FindFirst("id")?.Value
                         ?? User?.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(userId))
                return BadRequest(new { message = "User id not available in token." });

            var newSub = await _subscribersService.AddSubscriberAsync(dto, userId);

            // Мапимо через AutoMapper замість ручного формування об'єкта
            var resultDto = _mapper.Map<SubscribersDto>(newSub);

            return Ok(new
            {
                message = "Subscription added successfully",
                subscription = resultDto
            });
        }
    }
}

using System.Security.Claims;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs.Subscribers;

namespace backend.Controllers.Equipment
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserSubscriptionsController : ControllerBase
    {
        private readonly SubscribersService _subscribersService;
        private readonly IMapper _mapper;

        public UserSubscriptionsController(SubscribersService subscribersService, IMapper mapper)
        {
            _subscribersService = subscribersService;
            _mapper = mapper;
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMySubscriptions()
        {
            var userId = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                         ?? User?.FindFirst("id")?.Value
                         ?? User?.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(userId))
                return BadRequest(new { message = "User id not available in token." });

            var subs = await _subscribersService.GetSubscriptionsByUserIdAsync(userId);

            // Мапимо список через AutoMapper
            var resultDtos = _mapper.Map<List<SubscribersDto>>(subs);

            return Ok(resultDtos);
        }
    }
}

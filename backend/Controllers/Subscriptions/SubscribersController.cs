using Microsoft.AspNetCore.Authorization;
using backend.DTOs.Subscribers;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers.Equipment
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SubscribersController : ControllerBase
    {
        private readonly SubscribersService _subscribersService;

        public SubscribersController(SubscribersService subscribersService)
        {
            _subscribersService = subscribersService;
        }

        [HttpPost("addSubscription")]
        public async Task<IActionResult> AddSubscription([FromBody] SubscribersDto dto)
        {
            var userId = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                         ?? User?.FindFirst("id")?.Value
                         ?? User?.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(userId))
                return BadRequest(new { message = "User id not available in token." });

            var newSub = await _subscribersService.AddSubscriberAsync(dto, userId);

            return Ok(new
            {
                message = "Subscription added successfully",
                id = newSub.Id,
                subscriptionId = newSub.SubscriptionId,
                startDate = newSub.StartDate,
                endDate = newSub.EndDate,
                status = newSub.Status,
                createdAt = newSub.CreatedAt
            });
        }
    }
}

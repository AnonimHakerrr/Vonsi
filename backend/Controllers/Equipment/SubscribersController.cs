using Microsoft.AspNetCore.Authorization;
using backend.DTOs.Subscribers; // <- обов'язково додати
using backend.Services;
using Microsoft.AspNetCore.Mvc;

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
    await _subscribersService.AddSubscriberAsync(dto);
    return Ok(new { message = "Subscription added successfully" });
}

    }
}

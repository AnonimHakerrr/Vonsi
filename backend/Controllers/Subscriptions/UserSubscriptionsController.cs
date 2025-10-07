using System.Security.Claims;
using backend.DTOs.Subscribers;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace backend.Controllers.Equipment
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserSubscriptionsController : ControllerBase
    {
        private readonly UserSubscriptionsService _service;

        public UserSubscriptionsController(UserSubscriptionsService service)
        {
            _service = service;
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMySubscriptions()
        {
            var userId = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                         ?? User?.FindFirst("id")?.Value
                         ?? User?.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(userId))
                return BadRequest(new { message = "User id not available in token." });

            var subs = await _service.GetUserSubscriptionsForDashboardAsync(userId);
            return Ok(subs);
        }
    }
}

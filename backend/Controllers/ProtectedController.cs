using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProtectedController : ControllerBase
    {
        [HttpGet("me")]
        public IActionResult Me() =>
            Ok(new { message = "Protected data", user = User.Identity?.Name });
    }
}

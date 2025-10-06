using System.Security.Claims;
using backend.DTOs.EquipmentRental;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers.EquipmentRental
{


    [ApiController]
    [Route("api/[controller]")]
    public class EquipmentController : ControllerBase
    {
        private readonly EquipmentService _equipmentService;
        public EquipmentController(EquipmentService equipmentService)
        {
            _equipmentService = equipmentService;
        }

        [HttpGet("getAllEquipmentAvailable")]
        public async Task<IActionResult> GetAllEquipmentAvailable([FromQuery] DateTime from, [FromQuery] DateTime to)
        {
            var equipments = await _equipmentService.GetAvailableWithDetailsAsync(from, to);
            return Ok(equipments);

        }

        [Authorize]
        [HttpPost("reserveEquipment")]
        public async Task<IActionResult> ReserveEquipment([FromBody] EquipmentReservationDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _equipmentService.CreateEquipmentReservationAsync(dto, userId);
            if (!result.Success)
                return BadRequest(new { message = result.Message });
            return Ok(result.Data);
        }

        [HttpGet("getUserReservations")]
        [Authorize]
        public async Task<IActionResult> GetUserReservations()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var reservations = await _equipmentService.GetUserReservationsAsync(userId);
            return Ok(reservations);
        }
    }
}
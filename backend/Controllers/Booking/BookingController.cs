using backend.DTOs.Booking;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Всі методи потребують авторизації
    public class BookingController : ControllerBase
    {
        private readonly BookingService _bookingService;

        public BookingController(BookingService bookingService)
        {
            _bookingService = bookingService;
        }

         [HttpGet("getAll")]
        public async Task<IActionResult> GetAllUserBookings()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var bookings = await _bookingService.GetUserBookingsAsync(userId!);
            return Ok(bookings);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var booking = await _bookingService.GetBookingByIdAsync(id);

            if (booking == null || booking.UserId != userId)
                return NotFound(new { message = "Booking not found." });

            return Ok(booking);
        }

        [HttpPost("booking")]
        public async Task<IActionResult> CreateBooking([FromBody] CreateBookingDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _bookingService.CreateBookingAsync(dto, userId!);

            if (!result.Success)
                return BadRequest(new { message = result.Message });

            return CreatedAtAction(nameof(GetById), new { id = result.Data!.Id }, result.Data);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] Booking updatedBooking)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _bookingService.UpdateBookingAsync(id, updatedBooking, userId!);

            if (!result.Success)
                return NotFound(new { message = result.Message });

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _bookingService.DeleteBookingAsync(id, userId!);

            if (!result.Success)
                return NotFound(new { message = result.Message });

            return NoContent();
        }
    }
}

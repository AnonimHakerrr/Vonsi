using AutoMapper;
using backend.DTOs.Booking;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly RoomService _roomService;
        private readonly IMapper _mapper;

        public RoomsController(RoomService roomService, IMapper mapper)
        {
            _roomService = roomService;
            _mapper = mapper;
        }



        [HttpGet("rooms")]
        public async Task<IActionResult> GetAvailableRooms([FromQuery] DateTime from, [FromQuery] DateTime to, [FromQuery] int capacity = 1)
        {
            if (from >= to)
                return BadRequest("Дата 'from' має бути меншою за дату 'to'.");

            var rooms = await _roomService.GetAvailableAsync(from, to, capacity);
            var dto = _mapper.Map<List<RoomDto>>(rooms);

            return Ok(dto);
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<RoomDto>> GetRoom(string id)
        {
            var room = await _roomService.GetByIdAsync(id);
            if (room == null) return NotFound();

            var dto = _mapper.Map<RoomDto>(room);
            return Ok(dto);
        }
    }
}

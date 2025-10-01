using AutoMapper;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

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

        // [HttpGet("{id}")]
        // public async Task<IActionResult> GetEquipmentById(string id)
        // {
        //     var equipment = await _equipmentService.GetEquipmentByIdAsync(id);
        //     if (equipment == null)
        //     {
        //         return NotFound();
        //     }
        //     return Ok(equipment);
        // }
    }
}
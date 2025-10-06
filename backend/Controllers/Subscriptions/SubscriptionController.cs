using backend.DTOs.Subscriptions;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;
using AutoMapper;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubscriptionController : ControllerBase
    {
        private readonly SubscriptionService _subscriptionService;
        private readonly IMapper _mapper;

        public SubscriptionController(SubscriptionService subscriptionService, IMapper mapper)
        {
            _subscriptionService = subscriptionService;
            _mapper = mapper;
        }

        [HttpGet("allSubscription")]
        [SwaggerOperation(Summary = "Повертає всі абонементи")]
        public async Task<IActionResult> GetAllSubscriptions()
        {
            var subscriptions = await _subscriptionService.GetAllSubscriptionsAsync();

            // Мапимо через AutoMapper
            var resultDtos = _mapper.Map<List<SubscriptionDto>>(subscriptions);

            return Ok(resultDtos);
        }
    }
}

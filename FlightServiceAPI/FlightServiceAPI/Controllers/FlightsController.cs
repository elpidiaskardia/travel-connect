using Microsoft.AspNetCore.Mvc;
using FlightServiceAPI.Dto;
using FlightServiceAPI.Services;

namespace FlightServiceAPI.Controllers
{
    [ApiController]
    [Route("flightService/api/")]
    public class FlightsController:Controller
    {
        private readonly IFlightService _flightService;

        public FlightsController(IFlightService flightService)
        {
            _flightService = flightService;
        }

        [HttpGet("flights/{number}")]
        public ActionResult<IEnumerable<FlightDto>> GetFlights(string number)
        {
            var flights = _flightService.GetFlights(number);
            return Ok(flights);
        }
    }
}

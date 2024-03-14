using Microsoft.AspNetCore.Mvc;
using TravelConnect.Application.Interface;
using DataAccess.DTO;

namespace TravelConnect.Controllers
{
    [ApiController]
    [Route("Travelconnect/api/")]
    public class TravelConnectController : Controller
    {
        #region  App Initialization
        private readonly ILogger<TravelConnectController> _logger;

        public readonly ITravelConnect _app;
        public TravelConnectController(ITravelConnect app, ILogger<TravelConnectController> logger)
        {
            _logger = logger;
            _app = app;
        }
        #endregion
        [HttpGet("getJourney/{origin}/{destination}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(JourneyDto),StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetJourney(string origin, string destination)
        {

            if (string.IsNullOrEmpty(origin) || string.IsNullOrEmpty(destination))
            {
                _logger.LogError("Invalid input parameters");
                return BadRequest("Invalid input parameters");
            }
            else
            {
                try
                {
                   JourneyDto resultDto = _app.GetJourney(origin, destination);
                    if (string.IsNullOrEmpty(resultDto.Origin))
                    {
                        return StatusCode(404, "No flight found.");
                    }
                    else
                    {
                        return Ok(resultDto);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError("Error consuming service id" , ex);
                    return StatusCode(500, "Error consuming service id" );
                }
            }
          
        }
    }
}
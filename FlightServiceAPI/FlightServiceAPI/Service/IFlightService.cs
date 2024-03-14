using FlightServiceAPI.Dto;

namespace FlightServiceAPI.Services
{
    public interface IFlightService
    {
        IEnumerable<FlightDto> GetFlights(string number);
    }
}

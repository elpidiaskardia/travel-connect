using FlightServiceAPI.Dto;
using FlightServiceAPI.Repository;

namespace FlightServiceAPI.Services
{
    public class FlightService : IFlightService
    {
        private readonly FlightsRepository _flightsRepository;

        public FlightService(FlightsRepository flightsRepository)
        {
            _flightsRepository = flightsRepository;
        }

        public IEnumerable<FlightDto> GetFlights(string number)
        {
            return _flightsRepository.GetFlights(number);
        }
    }
}

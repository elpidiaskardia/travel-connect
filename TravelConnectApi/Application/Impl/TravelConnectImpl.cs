using DataAccess.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TravelConnect.Application.Interface;
using TravelConnect.DataAccess.Repository;
using Microsoft.Extensions.Logging;

namespace TravelConnect.Application.Impl
{
    public class TravelConnectImpl : ITravelConnect
    {
        private TravelConnectRepository Repository { get; set; }
        private readonly ILogger<TravelConnectRepository> _logger;

        public TravelConnectImpl(ILogger<TravelConnectRepository> logger)
        {
            _logger = logger;
            Repository = new TravelConnectRepository(new HttpClient(), logger);
        }

        /// <summary>
        /// Calculates the optimal journey based on the given origin, destination.
        /// </summary>
        /// <param name="origin"></param>
        /// <param name="destination"></param>
        /// <returns></returns>
        public JourneyDto GetJourney(string origin, string destination)
        {
            try
            {
                List<FlightDto> flightDtoList =  Repository.GetFlights().Result;

                JourneyDto journeyDto = CalculateJourney(origin, destination, flightDtoList);

                return journeyDto;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error calculate jounrey",ex);
                return new JourneyDto();
            }
        }
        /// <summary>
        /// Calculates the optimal journey based on the given origin, destination, and list of flights.
        /// </summary>
        /// <param name="origin"></param>
        /// <param name="destination"></param>
        /// <param name="flightDtoList">The list of available flights.</param>
        /// <returns>The optimal JourneyDto representing the calculated journey.</returns>

        private JourneyDto CalculateJourney(string origin, string destination, List<FlightDto> flightDtoList)
        { 
            List<JourneyDto> journeyList = new List<JourneyDto>();
            foreach (FlightDto flight in flightDtoList.FindAll(f => f.Origin == origin)) 
            {
                JourneyDto journey = new JourneyDto
                {
                    Origin = origin,
                    Destination = destination,
                    Price = 0,
                    Flights = new List<FlightDto>()
                };
                journey.Flights.Add(flight);
                journey.Price += flight.Price;
                CalculateJourneyRecursive(flight.Destination, destination, flightDtoList.FindAll(f => f.Origin != origin), journey , journeyList);
            }
            return journeyList.OrderBy(p => p.Price).ToList().First();
        }
        /// <summary>
        /// Recursive function to continue calculating the journey.
        /// </summary>
        /// <param name="origin"></param>
        /// <param name="destination"></param>
        /// <param name="flightDtoList">The remaining list of available flights.</param>
        /// <param name="beforeJourney">The current state of the journey before adding the current flight.</param>
        /// <param name="journeyList">The list to store different journey possibilities.</param>
        private void CalculateJourneyRecursive (string origin, string destination, List<FlightDto> flightDtoList, JourneyDto beforeJourney, List<JourneyDto> journeyList)
        {
            if (origin == destination)
            {
                journeyList.Add(beforeJourney); 
            }
            else
            {
                foreach (FlightDto flight in flightDtoList.FindAll(f => f.Origin == origin))
                {
                    JourneyDto currentJourney = beforeJourney;
                    currentJourney.Flights = new List<FlightDto>(beforeJourney.Flights); 
                    currentJourney.Flights.Add(flight);
                    currentJourney.Price += flight.Price;
                    CalculateJourneyRecursive(flight.Destination, destination, flightDtoList.FindAll(f => f.Origin != origin), currentJourney, journeyList);
                }
            }
        }
    }
}

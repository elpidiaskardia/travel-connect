using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using DataAccess.DTO;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace TravelConnect.DataAccess.Repository
{
    public class TravelConnectRepository
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<TravelConnectRepository> _logger;

        public TravelConnectRepository(HttpClient httpClient, ILogger<TravelConnectRepository> logger)
        {
            _logger = logger;
            _httpClient = httpClient;
        }


        /// <summary>
        /// Submit the request to obtain flights with multiple routes and return.
        /// </summary>
        /// <returns>List of flightDto with the result of the flights.</returns>
        /// <exception cref="Exception"></exception>
        public async Task<List<FlightDto>> GetFlights()
        {
            try
            {
                HttpResponseMessage response = await _httpClient.GetAsync("https://localhost:7229/flightService/api/flights/3");

                if (response.IsSuccessStatusCode)
                {

                    string jsonResponse = await response.Content.ReadAsStringAsync();

                    List<FlightDto> flightDtoList = JsonConvert.DeserializeObject<List<FlightDto>>(jsonResponse);

                    return flightDtoList;
                }
                else { return null; }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error while consuming the data.", ex);
                return null;
            }
        }
}
}

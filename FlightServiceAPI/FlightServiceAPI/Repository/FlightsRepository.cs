using FlightServiceAPI.Dto;
using System.Text.Json;

namespace FlightServiceAPI.Repository
{
    public class FlightsRepository
    {

        public IEnumerable<FlightDto> GetFlights(string number)
        {
            string jsonFileName = $"DataFake/{number}.json";
            string jsonFilePath = Path.Combine(Environment.CurrentDirectory, jsonFileName);

            if (File.Exists(jsonFilePath))
            {
                string jsonContent = File.ReadAllText(jsonFilePath);
                List<FlightDto> flights = JsonSerializer.Deserialize<List<FlightDto>>(jsonContent);
                return flights;
            }
            else
            {
                Console.WriteLine($"Error: No data found");
                return new List<FlightDto>();
            }
        }
    }
}

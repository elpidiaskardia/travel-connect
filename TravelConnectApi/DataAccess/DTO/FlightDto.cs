using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DTO
{
    public struct FlightDto
    {
        public string Origin { get; set; }
        public string Destination { get; set; }
        public TransportDto Transport { get; set; }
        public double Price { get; set; }

        [JsonConstructor]
        public FlightDto(string flightCarrier, string flightNumber, string arrivalStation, string departureStation, double price)
        {
            Transport = new TransportDto { FlightCarrier = flightCarrier, FlightNumber = flightNumber };
            Origin = arrivalStation;
            Destination = departureStation;
            Price = price;
        }

    }
}

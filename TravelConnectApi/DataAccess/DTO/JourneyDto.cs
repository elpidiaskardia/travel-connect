using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DTO
{
    public struct  JourneyDto
    {
        public List<FlightDto> Flights { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public double Price { get; set; }
    }
}

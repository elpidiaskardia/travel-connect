using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DataAccess.DTO
{
    public struct TransportDto
    {
        public string FlightCarrier { get; set; }
        public string FlightNumber { get; set; }
    }
}

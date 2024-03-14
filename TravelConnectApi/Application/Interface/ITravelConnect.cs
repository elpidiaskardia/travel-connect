using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DTO;

namespace TravelConnect.Application.Interface
{
    public interface ITravelConnect
    {
        public JourneyDto GetJourney(string origin, string destination);
    }
}

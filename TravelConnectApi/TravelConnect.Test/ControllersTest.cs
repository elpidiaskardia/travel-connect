
using TravelConnect.Controllers;
using Microsoft.Extensions.Logging;
using Moq;
using TravelConnect.Application.Interface;
using Microsoft.AspNetCore.Mvc;
using TravelConnect.Application.Impl;
using TravelConnect.DataAccess.Repository;

namespace TravelConnect.Test
{
    public class ControllersTest
    {

        [Fact]
        public void SuccessGetJourney()
        {
            var loggerTravelConnectRepositoryMock = new Mock<ILogger<TravelConnectRepository>>();
            var ITravelConnect = new TravelConnectImpl(loggerTravelConnectRepositoryMock.Object);
            var loggerControllerMock = new Mock<ILogger<TravelConnectController>>();
            string origin = "MZL";
            string destination = "BCN";

            var controller = new TravelConnectController(ITravelConnect, loggerControllerMock.Object);
            var result =  controller.GetJourney(origin, destination) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);

        }

        [Fact]
        public void NotFoundGetJourney()
        {
            var loggerTravelConnectRepositoryMock = new Mock<ILogger<TravelConnectRepository>>();
            var ITravelConnect = new TravelConnectImpl(loggerTravelConnectRepositoryMock.Object);
            var loggerControllerMock = new Mock<ILogger<TravelConnectController>>();
            string origin = "MCL";
            string destination = "BOG";

            var controller = new TravelConnectController(ITravelConnect, loggerControllerMock.Object);
            var result = controller.GetJourney(origin, destination) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(404, result.StatusCode);
            Assert.Equal("No flight found.", result.Value);

        }


        [Fact]
        public void BadRequestGetJourney()
        {
            var loggerTravelConnectRepositoryMock = new Mock<ILogger<TravelConnectRepository>>();
            var ITravelConnect = new TravelConnectImpl(loggerTravelConnectRepositoryMock.Object);
            var loggerControllerMock = new Mock<ILogger<TravelConnectController>>();
            string origin = "";
            string destination = "BOG";

            var controller = new TravelConnectController(ITravelConnect, loggerControllerMock.Object);
            var result = controller.GetJourney(origin, destination) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(400, result.StatusCode);

        }
    }
}
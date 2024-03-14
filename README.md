# Travel Connect Application

## Overview
This project is a solution to a full-stack technical test. In the test statement, there was a mention of consuming an API that returns flight data "https://recruiting-api.....es/api/flights". However, this API was down at the time of the test, so the 'Flight Service' API was created in order to complete the test.
 

### 1. Flight Service (Built with .NET 6)

The Flight Service offering various flight routes:

- **Type 1:** Single routes
- **Type 2:** Multiple routes
- **Type 3:** Multiple routes with return

### 2. Travel Connect API (Built with .NET 6)

The Travel Connect API consumes the Flight Service and returns the optimal route considering both price and the number of layovers.

### 3.Travel Connect Web (Built with Angular 17)

The Travel Connect Web is the user-facing application developed in Angular 17. It seamlessly integrates with the Air Travel API to provide users with an intuitive interface to explore and select their desired flight routes.

## Versions

### Backend
- .ASP.NET Core 6
### Frontend
- Angular 17.2.3
- Node 18.17.0
## How to run the application

To set up the Travel Connect  Application, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/elpidiaskardia/travel-connect.git
### Flight Service
1. Navigate to the \FlightServiceAPI folder and run the FlightServiceAPI.sln.
2. Run the FlightServiceAPI.
   
### Travel Connect API
1. Navigate to the \TravelConnectApi folder and run the TravelConnect.sln.
2. Run the TravelConnect.

### Travel Connect Web
1.  Navigate to the \TravelConnectWeb folder.
2.  Open the terminal.
3.  Install node.
     ```bash
     npm install
4. Run the application.
    ```bash
     ng serve
## Screenshot
![image web](/Screenshot/TravelConnect.PNG)
## Use
In the Flight Service project, there is a folder called "Datafake," which contains 3 JSON files. The first one contains the unique routes, the second one contains the multiple routes, and the third one contains the multiple round-trip routes. You can modify these files to create the routes you desire.
Here are some sample codes of routes that you can try in the input of origin and destination.

|  City Codes |
|:--------------:|
| MDE   | 
| BOG   | 
| PEI   | 
| CTG   | 
| CAL   | 
| VVC   | 
| AXM   | 
| CLO   | 

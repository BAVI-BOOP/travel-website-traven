import translate from "./translate.js";

const hotelOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3be46c2a52msh1c8fa446280fb71p1a6d3fjsn365b3c0e6b6b",
    "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
  },
};

const flightOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3be46c2a52msh1c8fa446280fb71p1a6d3fjsn365b3c0e6b6b",
    "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
  },
};

let hotel = document.getElementById("hotel");
let flight = document.getElementById("flight");
let navTabs = document.getElementById("nav-tabs");
let hotelOrFlight = "hotel";

let checkoutContainer = document.getElementById("checkoutContainer");
let destinationContainer = document.getElementById("destinationContainer");

navTabs.addEventListener("click", (event) => {
  if (event.target.id === "hotel") {
    hotel.style.color = "#ff666f";
    flight.style.color = "black";
    hotelOrFlight = "hotel";
    checkoutContainer.style.display = "inline-block";
    checkoutContainer.style.display = "flex";
    destinationContainer.style.display = "none";
  } else if (event.target.id === "flight") {
    hotel.style.color = "black";
    flight.style.color = "#ff666f";
    hotelOrFlight = "flight";
    destinationContainer.style.display = "inline-block";
    destinationContainer.style.display = "flex";
    checkoutContainer.style.display = "none";
  }

  console.log(hotelOrFlight);
});

const search = document.querySelector(".search");
const results = document.querySelector(".search-results");

const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");

const passengers = document.getElementById("passengers");

const arrival = document.getElementById("location");

// Hotel datas that will be displayed
let photo = document.querySelector(".photo");
let price = document.querySelector(".price");
let rating = document.querySelector(".rating");
let address = document.querySelector(".address");
let hotelName = document.querySelector(".hotelName");

function showResult(event) {
  event.preventDefault();

  let arrivalInfo = arrival.value;
  let checkInInfo = checkIn.value;
  let checkOutInfo = checkOut.value;
  let passengersInfo = passengers.value;

  if (hotelOrFlight === "hotel") {
    fetch(
      `https://hotels4.p.rapidapi.com/locations/v2/search?query=${arrivalInfo}&locale=en_US&currency=USD`,
      hotelOptions
    )
      .then((response) => response.json())
      .then((response) =>
        fetch(
          `https://hotels4.p.rapidapi.com/properties/list?destinationId=${response.suggestions[0].entities[0].destinationId}&pageNumber=1&pageSize=5&checkIn=${checkInInfo}&checkOut=${checkOutInfo}&adults1=${passengersInfo}&sortOrder=PRICE&locale=en_US&currency=USD`,
          hotelOptions
        )
          .then((hotelData) => hotelData.json())
          .then((responseTwo) => {
            console.log(responseTwo);
            results.innerHTML = "";
            responseTwo.data.body.searchResults.results.forEach((object) => {
              results.innerHTML += `        
              <div class="card">
              <div class="card-top">
                <p class="hotelName">${object.name}</p>
              </div>
              <div class="card-info">
                <div>Photo</div>
                <div>Adress</div>
                <div>Rating</div>
                <div>Price</div>
              </div>
              <div class="card-bottom">
                <div>
                  <img
                    src="${object.optimizedThumbUrls.srpDesktop}"
                    alt=""
                    class="photo"
                  />
                </div>
                <div><p class="address">${object.address.streetAddress}</p></div>
                <div class="rating">${object.guestReviews.rating}</div>
                <div class="price">${object.ratePlan.price.current}</div>
              </div>
            </div>`;
            });
          })
          .catch((err) => console.error(err))
      )
      .catch((err) => console.error(err));
  } else if (hotelOrFlight === "flight") {
    let destinationLocation = document.getElementById("destinationInfo");
    let destinationInfo = destinationLocation.value;
    console.log(destinationInfo);

    fetch(
      `https://priceline-com-provider.p.rapidapi.com/v1/flights/locations?name=${arrivalInfo}`,
      flightOptions
    )
      .then((response) => response.json())
      .then((response) => {
        let fromIata = response[0].id;
        fetch(
          `https://priceline-com-provider.p.rapidapi.com/v1/flights/locations?name=${destinationInfo}`,
          flightOptions
        )
          .then((responseTwo) => responseTwo.json())
          .then((responseTwo) => {
            let toIata = responseTwo[0].id;
            fetch(
              `https://priceline-com-provider.p.rapidapi.com/v1/flights/search?itinerary_type=ONE_WAY&class_type=ECO&location_arrival=${toIata}&date_departure=${checkInInfo}&location_departure=${fromIata}&sort_order=PRICE&price_max=20000&number_of_passengers=${passengersInfo}&price_min=100`,
              flightOptions
            )
              .then((response) => response.json())
              .then((responseThree) => {
                let code = responseThree.totalTripSummary.airline[0].code;
                function isobj(company) {
                  return company.code === code;
                }
                let airlineObject = responseThree.airline.find(isobj);
                let airlineName = airlineObject.name;
                let airlineUrl = airlineObject.websiteUrl;
                console.log(code);
                console.log(responseThree);
                results.innerHTML = "";
                results.innerHTML = `
                <div class="card">
                <div class="card-top">
                  <p class="flightName">${airlineName}</p>
                </div>
                <div class="card-info">
                  <div lng-tag="Airline Website">Airline Website</div>
                  <div lng-tag="Departure">Departure</div>
                  <div lng-tag="Arrival">Arrival</div>
                  <div lng-tag="Cheapest Price">Cheapest Price</div>
                </div>
                <div class="card-bottom">
                  <div>
                  <a href=https://${airlineUrl} target="_blank" class='link'><i class="fa-brands fa-google"></i> Go to Airline website</a>
                  </div>
                  <div><p class="web-address">From:${arrivalInfo}  </p></div>
                  <div class="to">To: ${destinationInfo}</div>
                  <div class="price-flight">${responseThree.totalTripSummary.airline[0].lowestTotalFare.amount}$</div>
                </div>
              </div>               
                `;
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }
}

search.addEventListener("click", showResult);


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
    "X-RapidAPI-Host": "skyscanner50.p.rapidapi.com",
  },
};

const search = document.querySelector(".search");
const results = document.querySelector(".search-results");

const arrival = document.getElementById("location");
const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");
const passengers = document.getElementById("passengers");

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
}

search.addEventListener("click", showResult);

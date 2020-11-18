function updateDate(timestamp){
  let now = new Date (timestamp);
 
  let days = ["Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

  let day = days[now.getDay()];
  return `${day} ${updateTime(timestamp)}`;
};


function updateTime(timestamp){
    let now = new Date (timestamp);
    let hour = now.getHours();
    if (hour < 10) {
      hour = `0${hour}`
    };
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    };
   return time = `${hour}:${minutes}`;

}


function searchCity (city) {
  let apiKey = "8a57f1d5fc85e50c20e2b1b1b4377d2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
  
}

function displayWeather (response){
  celsiusTemperature = response.data.main.temp;
  let description = response.data.weather[0].main;
  document.querySelector("#current-temp").innerHTML = `${Math.round(celsiusTemperature)}`;
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  document.querySelector("#description").innerHTML = description;
  
let dateElement = document.querySelector("#current-date");
dateElement.innerHTML = updateDate(response.data.dt * 1000);


  console.log(response.data.weather[0].main);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
};

function handleSubmit(event){
  event.preventDefault();
    let city = document.querySelector(".search-bar").value;
    searchCity(city);
  };

  function searchLocation(position){
  let apiKey = "8a57f1d5fc85e50c20e2b1b1b4377d2d";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  
};

  function getCurrentLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  };
  
  
    
  
  function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temp");
celsiusButton.classList.remove("active");
fahrenheitButton.classList.add("active");

    let fahrenheitTemperature = (celsiusTemperature * 9/5) + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  };

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
    let temperatureElement = document.querySelector("#current-temp");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

  
  let celsiusTemperature = null;
  
  let button = document.querySelector("#go-button");
  button.addEventListener("click", handleSubmit);
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
  let fahrenheitButton = document.querySelector("#fahrenheit");
  fahrenheitButton.addEventListener("click", displayFahrenheitTemperature);
  
  let celsiusButton = document.querySelector("#celsius");
  celsiusButton.addEventListener("click", displayCelsiusTemperature);


  searchCity ("London");
function updateDate(){
  let currentDay = document.querySelector("#current-date");
  currentDay.innerHTML = day;
  }
  
  
  function updateTime(){
    let currentTime = document.querySelector("#current-time");
    currentTime.innerHTML = time;
  }
  
  function searchCity (city) {
    let apiKey = "8a57f1d5fc85e50c20e2b1b1b4377d2d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);

  }

  function displayWeather (response){
  document.querySelector("#current-temp").innerHTML = `${Math.round(response.data.main.temp)}℃`;
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
document.querySelector("#description").innerHTML = response.data.weather[0].main;
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
  
  let days = ["Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"]
  let now = new Date();
  let day = days[now.getDay()];
  
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`
  };
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  };
  let time = `${hour}:${minutes}`
  
  
  updateDate();
  updateTime();
  
  let button = document.querySelector("#go-button");
  button.addEventListener("click", handleSubmit);

  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity ("London");
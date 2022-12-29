let popular = document.getElementById("popular");
let geoLocation = document.getElementById("geoLocation");
let todayWeather = document.querySelector("#todays-forecast");
let FutureWeather = document.getElementById("future-forecast");
let time = document.getElementById("currentTime");
let currentCity = document.querySelector(".weatherInfo");
let bg = document.querySelector("#weatherInfo");
let city = localStorage.getItem("CityName");

function getWeatherdat() {
  let city = document.getElementById("search").value;
  if(!city){
    city=localStorage.getItem("CityName");
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c873745b8adc58393d29eeb7abc89fc3`;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      // console.log(res)
      append(res);
      getForecastData(res.coord.lat, res.coord.lon);
      // getweather()
    })
    .catch(function (err) {
      return err;
    });
}
function getForecastData(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=c873745b8adc58393d29eeb7abc89fc3`;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      console.log(res);
      append2(res);
      // append(res)
    })
    .catch(function (err) {
      return err;
    });
}

setInterval(() => {
  const time1 = new Date();
  const hour = time1.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time1.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  // time.innerHTML =
  //   (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
  //   ":" +
  //   (minutes < 10 ? "0" + minutes : minutes) +
  //   " " +
  //   `<span id="am-pm">${ampm}</span>`;

  // if (hour < 18) {
  //   bg.style.backgroundImage = `url("https://assets.msn.com/weathermapdata/1/static/background/v2.0/compactads3/Sunny.png")`;
  // } else {
  //   bg.style.backgroundImage = `url("https://assets.msn.com/weathermapdata/1/static/background/v2.0/compactads3/Clear Night.png")`;
  // }
}, 1000);

function append(data) {
  currentCity.innerHTML = null;
  windy.innerHTML=`<iframe width="1200" height="600" src="https://embed.windy.com/embed2.html?lat=${data.coord.lat}&lon=${data.coord.lon}&detailLat=${data.coord.lat}&detailLon=${data.coord.lat}&width=1000&height=680&zoom=10&level=surface&overlay=clouds&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1" frameborder="0"></iframe>`
  // const options = {
  //   // Required: API key
  //   key: "JCqyLUeQAYOw2q4AWkuWmXBHMpJ7bZul", // REPLACE WITH YOUR KEY !!!
  //
  //   // Put additional console output
  //   verbose: true,
  //
  //   // Optional: Initial state of the map
  //   lat: data.coord.lat,
  //   lon: data.coord.lon,
  //   zoom: 10,
  // };
  // let LocationMap=document.body.getElementsByClassName("gmap_canvas");
  // // Initialize Windy API
  // windyInit(options, (windyAPI) => {
  //   // windyAPI is ready, and contain 'map', 'store',
  //   // 'picker' and other usefull stuff
  //
  //   const { map } = windyAPI;
  //   // .map is instance of Leaflet map
  //
  //   LocationMap=L.popup().setLatLng([lat, lon]).setContent("Hello World").openOn(map);
  // });


  // currentCity.innerHTML = `<div class="currentTemp">
  //       <div class="temp">
  //           <img src="http://openweathermap.org/img/wn/${
  //             data.weather[0].icon
  //           }@4x.png" alt="">
  //           <h1>${data.main.temp}°C</h1>
  //       </div>
  //       <div class="currentWeather">
  //           <h3 class="today-weather">${data.weather[0].main}</h3>
  //           <p class="feelsLike">FEELS LIKE ${data.main.feels_like}°C</p>
  //       </div>
  //       <div class="DayExpect">
  //           <p>Expect ${data.weather[0].main}. The high will be ${
  //   data.main.temp_max
  // }°C.</p>
  //       </div>
  //   </div>
  //   <div class="todays-info">
  //       <div class="wind">
  //           <p>WIND</p>
  //           <p class="wind-speed">${
  //             data.wind.speed
  //           }km/h <i class="fa-solid fa-wind"></i></p>
  //       </div>
  //       <div class="humidity">
  //           <p>HUMIDITY</p>
  //           <p class="current-humidity"><i class="fa-solid fa-droplet"></i> ${
  //             data.main.humidity
  //           }%</p>
  //       </div>
  //       <div class="visibility">
  //           <p>VISIBILITY</p>
  //           <p class="current-visibility">${data.visibility / 1000} km</p>
  //       </div>
  //       <div class="pressure">
  //           <p>PRESSURE</p>
  //           <p class="current-pressure">${data.main.pressure} mb</p>
  //       </div>
  //       <div class="sunrise">
  //           <p>Sunrise</p>
  //           <p class="current-dew">${window
  //             .moment(data.sys.sunrise * 1000)
  //             .format("HH:mm a")}</p>
  //       </div>
  //       <div class="sunset">
  //       <p>Sunset</p>
  //       <p class="air-quality">${window
  //         .moment(data.sys.sunset * 1000)
  //         .format("HH:mm a")}</p>
  //   </div>
  //   </div>`;

  // popular.innerHTML = "";

  geoLocation.innerHTML = `
    <p id="CityName1">${data.name}</p>`;
}

function append2(data) {
  todayWeather.innerHTML = null;
  FutureWeather.innerHTML = null;
  data.hourly.forEach(function (ele, index) {
    if (index == 0) {
      console.log("if wala", ele);
      todayWeather.innerHTML = `<div class="today">
            <!-- <p>${window.moment(ele.dt * 1000).format("hh:mm a")} </p> -->
            </div>
            <!-- <div class="Todays-temp">
                <img src="http://openweathermap.org/img/wn/${
                  ele.weather[0].icon
                }@2x.png" alt="">
                <div> -->
                    <p class="temp">${data.hourly[0].temp}°C</p>
                </div>
                <div class="todays-Weather">
                    <p class="today-weather">${
                      data.hourly[0].weather[0].description
                    }</p>
                    <p class="humidity"><i class="fa-solid fa-droplet"></i> ${
                      ele.humidity
                    }%</p>
                </div>
            </div>`;}
    // } else {
    //   console.log("else wala", ele);
    //   FutureWeather.innerHTML += `<div>
    //             <div class="day">
    //                 <p>${window.moment(ele.dt * 1000).format("hh:mm a")}</p>
    //             </div>
    //             <div class="days-temp">
    //                 <img src="http://openweathermap.org/img/wn/${
    //                   data.hourly[0].weather[0].icon
    //                 }.png" alt="">
    //                 <div>
    //                     <p class="day-temp">${data.hourly[index].tem}°C</p>
    //                 </div>
    //             </div>
    //         </div>`;
    // }
  });
}
window.onload = getWeatherdat;

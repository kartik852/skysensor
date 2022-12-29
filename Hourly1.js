let popular = document.getElementById("popular");
let geoLocation = document.getElementById("geoLocation");
let todayWeather = document.querySelector("#todays-forecast");
let FutureWeather = document.getElementById("future-forecast");
let time = document.getElementById("currentTime");
let currentCity = document.querySelector(".weatherInfo");
let bg = document.querySelector("#weatherInfo");

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
  time.innerHTML =
    (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    `<span id="am-pm">${ampm}</span>`;

  if (hour < 18) {
    bg.style.backgroundImage = `url("https://assets.msn.com/weathermapdata/1/static/background/v2.0/compactads3/Sunny.png")`;
  } else {
    bg.style.backgroundImage = `url("https://assets.msn.com/weathermapdata/1/static/background/v2.0/compactads3/Clear Night.png")`;
  }
}, 1000);

function append(data) {
  currentCity.innerHTML = null;
  let cityWeather = data.name;
  let apikey = "8faa5e340efa032c0e7eebc46f9bd824";
  let url =
    "https://gnews.io/api/v4/search?q=" +
    cityWeather +
    "&token=" +
    apikey +
    "&lang=en&country=" +
    data.sys.country +
    "&max=10";
  const newsDiv = document.querySelector(".NewsData");

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      articles = data.articles;
      newsDiv.innerHTML = null;
      for (i = 0; i < 10; i++) {
        console.log("Title: " + articles[i]["url"]);

        const news = document.createElement("div");

        news.style.borderBottom = "2px solid grey";
        news.style.display="flex";
        news.style.textAlign="left";
        // news.style.justifyContent="center";
        // news.style.overflowX="hidden";
        // news.style.overflowY="auto";
        news.style.gap="10px";


        // var objDiv = document.querySelector(".div");
        // objDiv.scrollTop = objDiv.scrollHeight;




        let ArticleContent = articles[i]["description"].substr(0, 120) + "...";

        news.innerHTML = `<div><img src="${articles[i]["image"]}" alt="" style="height:auto; width:60px; border:2px solid white;border-radius:4px; margin-top:8px; margin-left:5px;"></div><div><a href="${articles[i]["url"]}" target="_blank" style="text-decoration:none; color:black; font-weight:bold; font-size:12px; textAlign:left; justifyContent:center;">${ArticleContent}</a></div>`;

        newsDiv.appendChild(news);
      }
    });

  currentCity.innerHTML = `<div class="currentTemp">
        <div class="temp">
            <img src="http://openweathermap.org/img/wn/${
              data.weather[0].icon
            }@4x.png" alt="">
            <h1>${data.main.temp}°C</h1>
        </div>
        <div class="currentWeather">
            <h3 class="today-weather">${data.weather[0].main}</h3>
            <p class="feelsLike">FEELS LIKE ${data.main.feels_like}°C</p>
        </div>
        <div class="DayExpect">
            <p>Expect ${data.weather[0].main}. The high will be ${
    data.main.temp_max
  }°C.</p>
        </div>
    </div>
    <div class="todays-info">
        <div class="wind">
            <p>WIND</p>
            <p class="wind-speed">${
              data.wind.speed
            }km/h <i class="fa-solid fa-wind"></i></p>
        </div>
        <div class="humidity">
            <p>HUMIDITY</p>
            <p class="current-humidity"><i class="fa-solid fa-droplet"></i> ${
              data.main.humidity
            }%</p>
        </div>
        <div class="visibility">
            <p>VISIBILITY</p>
            <p class="current-visibility">${data.visibility / 1000} km</p>
        </div>
        <div class="pressure">
            <p>PRESSURE</p>
            <p class="current-pressure">${data.main.pressure} mb</p>
        </div>
        <div class="sunrise">
            <p>Sunrise</p>
            <p class="current-dew">${window
              .moment(data.sys.sunrise * 1000)
              .format("HH:mm a")}</p>
        </div>
        <div class="sunset">
        <p>Sunset</p>
        <p class="air-quality">${window
          .moment(data.sys.sunset * 1000)
          .format("HH:mm a")}</p>
    </div>
    </div>`;

  popular.innerHTML = "";

  geoLocation.innerHTML = `
    <p id="CityName">${data.name} , ${data.sys.country}</p>`;
}

function append2(data) {
  todayWeather.innerHTML = null;
  FutureWeather.innerHTML = null;
  data.hourly.forEach(function (ele, index) {
    if (index == 0) {
      console.log("if wala", ele);
      todayWeather.innerHTML = `<div class="today">
            <p>${window.moment(ele.dt * 1000).format("hh:mm a")} </p>
            </div>
            <div class="Todays-temp">
                <img src="http://openweathermap.org/img/wn/${
                  ele.weather[0].icon
                }@2x.png" alt="">
                <div>
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
            </div>`;
    } else {
      console.log("else wala", ele);
      FutureWeather.innerHTML += `<div>
                <div class="day">
                    <p>${window.moment(ele.dt * 1000).format("hh:mm a")}</p>
                </div>
                <div class="days-temp">
                    <img src="http://openweathermap.org/img/wn/${
                      data.hourly[0].weather[0].icon
                    }.png" alt="">
                    <div>
                        <p class="day-temp">${data.hourly[index].temp}°C</p>
                    </div>
                </div>
            </div>`;
    }
  });
}
window.onload = getWeatherdat;

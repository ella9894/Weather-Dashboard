var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.getElementById("city-name");
var forecast = document.querySelector("#forecast");
var apiKey = "e76723bec15d4ac7542f1468323edadb";
var cityArray = JSON.parse(localStorage.getItem("cityData")) || [];
var history = document.getElementById("history");


function fetchData(event, cityFromList) {
  $(".weather").show();
  cityArray = JSON.parse(localStorage.getItem("cityData")) || [];
  event.preventDefault();
  var cityName = cityFromList
    ? cityFromList
    : document.getElementById("city-name").value;
  forecast.innerHTML = "";
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appId=${apiKey}&limit=20`
  )
    .then(function (result) {
      return result.json();
    })
    .then(function (resultData) {
      var firstResult = resultData[0];
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${firstResult.lat}&lon=${firstResult.lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`
      )
        .then(function (result) {
          return result.json();
        })
        .then(function getWeather(resultData) {
          console.log(resultData);
          var currentDate = resultData.current.dt;
          var currentIcon = `https://api.openweathermap.org/img/w/${resultData.current.weather[0].icon}.png`;
          var curIcon = document.createElement("img");
          curIcon.setAttribute("src", currentIcon);

          var curCityValue = document.getElementById("city-name").value;
          var curCity = document.getElementById("city");
          curCity.innerText =
            `${cityName} ` +
            `(${moment.unix(currentDate).format("M/D/YYYY")}) `;
          curCity.append(curIcon);

          var getTemp = document.getElementById("temp");
          getTemp.innerText = `${resultData.current.temp}`;
          var fah = document.createElement("span");
          fah.innerHTML = "&#8457";
          getTemp.append(fah);

          document.getElementById("wind").innerText =
            `${resultData.current.wind_speed}` + ` MPH`;
          document.getElementById("humidity").innerText =
            `${resultData.current.humidity}` + `%`;
            uvIndex = document.getElementById("uvi");
            uvNumber=resultData.current.uvi;
            uvIndex.innerText = uvNumber;

            if (uvNumber <= 2) {
                uvIndex.setAttribute("class", "green");
            }
            else if (uvNumber > 2 && uvNumber <= 5) {
                uvIndex.setAttribute("class", "yellow");
            } else if (uvNumber > 5 && uvNumber <= 7) {
                uvIndex.setAttribute("class", "orange");
            } else if (uvNumber > 7 && uvNumber <= 10) {
                uvIndex.setAttribute("class", "red");
            } else {
                uvIndex.setAttribute("class", "purple");
            };
            
          for (var i = 0; i < 5; i++) {
            var forDay = resultData.daily[i].dt;
            var icon = `https://api.openweathermap.org/img/w/${resultData.daily[i].weather[0].icon}.png`;
            var T = resultData.daily[i].temp.day;
            var H = resultData.daily[i].humidity;
            var W = resultData.daily[i].wind_speed;

            var col = document.createElement("div");
            var card = document.createElement("div");
            var cardBody = document.createElement("div");
            var cardTitle = document.createElement("h4");
            var wIcon = document.createElement("img");
            var tempEl = document.createElement("p");
            var humEl = document.createElement("p");
            var windEl = document.createElement("p");

            col.append(card);
            card.append(cardBody);
            cardBody.append(cardTitle, wIcon, tempEl, humEl, windEl);

            cardBody.setAttribute("class", "card-body");
            cardTitle.setAttribute("class", "card-title");
            tempEl.setAttribute("class", "card-text");
            humEl.setAttribute("class", "card-text");
            windEl.setAttribute("class", "card-text");

            cardTitle.textContent = moment.unix(forDay).format("M/D/YYYY");
            tempEl.textContent = `Temp: ${T}`;
            var amp = document.createElement("span");
            amp.innerHTML = "&#8457";
            tempEl.append(amp);
            humEl.textContent = `Hummiditiy: ${H}` + ` MPH`;
            windEl.textContent = `Wind Speed: ${W}` + ` %`;
            wIcon.setAttribute("src", icon);

              forecast.append(cardBody);
              
          }

          if (!cityArray.includes(curCityValue) && !cityFromList) {
           
            var pastCity = $(
              `<li class="btn btn-secondary">${curCityValue}</li>`
            );
            $("#history").append(pastCity);
            $(pastCity).on("click", function (event) {
              var cityList = $(this).text();
              fetchData(event, cityList);
            });
          }

          if (!cityFromList) {
           
            cityArray.push(curCityValue);
            localStorage.setItem("cityData", JSON.stringify(cityArray));
          }

        
          console.log(cityArray);

        });
    });
}

cityFormEl.addEventListener("submit", fetchData);

$(document).ready(function () {
  if (cityArray.length) {
    cityArray.forEach(function (city) {
      var pastCity = $(`<li class="btn btn-secondary">${city}</li>`);
      $("#history").append(pastCity);

      $(pastCity).on("click", function (event) {
        var cityList = $(this).text();
        fetchData(event, cityList);
      });
    });
  }

  $("#clear").on("click", function () {
    $("#history").empty();
    localStorage.removeItem("cityData");
  });
});

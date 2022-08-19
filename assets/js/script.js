var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var forecast = document.querySelector('#forecast');
var apiKey = "e76723bec15d4ac7542f1468323edadb";
var cityArray = JSON.parse(localStorage.getItem("cityData")) || [];
var history = document.getElementById('history');
var clear = document.getElementById('clear');


function fetchData() {
    event.preventDefault();
    var cityName = cityInputEl.value;
    forecast.innerHTML = '';
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appId=${apiKey}&limit=20`).then(function (result) {
        return result.json();
    }).then(function (resultData) {
        var firstResult = resultData[0];
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${firstResult.lat}&lon=${firstResult.lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`).then(function (result) {
            return result.json();
        }).then(function getWeather(resultData) {
            console.log(resultData);
            var currentDate = resultData.current.dt;
            var currentIcon = `https://api.openweathermap.org/img/w/${resultData.current.weather[0].icon}.png`;
            var curIcon = document.createElement('img');
            curIcon.setAttribute('src', currentIcon);

            var curCity = document.getElementById('city')
            curCity.innerText = `${cityName} ` + `(${moment.unix(currentDate).format('M/D/YYYY')}) `;
            curCity.append(curIcon);
            
            
            var getTemp = document.getElementById('temp')
            getTemp.innerText = `${resultData.current.temp}`;
            var fah = document.createElement('span');
            fah.innerHTML = "&#8457";
            getTemp.append(fah);

            document.getElementById('wind').innerText = `${resultData.current.wind_speed}` + ` MPH`;
            document.getElementById('humidity').innerText = `${resultData.current.humidity}` + `%`;
            document.getElementById('uvi').innerText = resultData.current.uvi;
            for (var i = 0; i < 5; i++) {
                var forDay = resultData.daily[i].dt;
                var icon = `https://api.openweathermap.org/img/w/${resultData.daily[i].weather[0].icon}.png`;
                var T = resultData.daily[i].temp.day;
                var H = resultData.daily[i].humidity;
                var W = resultData.daily[i].wind_speed;
                        
                var col = document.createElement("div");
                var card = document.createElement('div');
                var cardBody = document.createElement('div');
                var cardTitle = document.createElement('h4');
                var wIcon = document.createElement('img');
                var tempEl = document.createElement('p');
                var humEl = document.createElement('p');
                var windEl = document.createElement('p');
              
            
                       
                col.append(card);
                card.append(cardBody);
                cardBody.append(cardTitle, wIcon, tempEl, humEl, windEl);
                        
            
                cardBody.setAttribute('class', 'card-body');
                cardTitle.setAttribute('class', 'card-title');
                tempEl.setAttribute('class', 'card-text');
                humEl.setAttribute('class', 'card-text');
                windEl.setAttribute('class', 'card-text');
            
                cardTitle.textContent = moment.unix(forDay).format('M/D/YYYY');
                tempEl.textContent = `Temp: ${T}`;
                var amp = document.createElement('span');
                amp.innerHTML = "&#8457";
                tempEl.append(amp);
                humEl.textContent = `Hummiditiy: ${H}` + ` MPH`;
                windEl.textContent = `Wind Speed: ${W}` + ` %`;
                wIcon.setAttribute('src', icon);

                forecast.append(cardBody);
            }
            var saveCity = { curCity, forecast };
            cityArray.push(saveCity);
            localStorage.setItem("cityData", JSON.stringify(cityArray));

            $('#search').on("click", function (event) {
                event.preventDefault();
            
                var city = $('#cityName').val().trim();
                getWeather(city);
                if (!cityArray.includes(city)) {
                    cityArray.push(city);
                    var pastCity = $(`<li class="list-group-item">${city}</li>`);
                    $("#history").append(pastCity);
                };
                localStorage.setItem("cityData", JSON.stringify(cityArray));
                console.log(cityArray);
            });
            
            $(document).on("click", ".list-group-item", function () {
                var cityList = $(this).text();
                getWeather(cityList);
            });
            
            $(document).ready(function () {
                if (cityArray !== null) {
                    var cityIndex = cityArray.length - 1;
                    var lastCity = cityArray[cityIndex];
                    getWeather(lastCity);
                }
            });

        });
        // .then(function displayHistory(event) {
        //     history.innerHTML = '';

        //     for (i = 0; i < cityArray.length; i++) {
        //         var pastCity = document.createElement("button");
        //         pastCity.setAttribute("style", "width:100%");
        //         pastCity.setAttribute("id", "past");
        //         // pastCity.addClass();
        //         pastCity.textContent = `${cityArray[i].curCity}`;
        //         history.append(pastCity);
        //     };
        //     var past = event.target;

        //     if (past.matches("#past")) {
        //         curCity = past.textContent;
        //         var Url = `https://api.openweathermap.org/data/2.5/onecall?lat=${firstResult.lat}&lon=${firstResult.lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;
           
        //         fetch(Url).then(function () {
        //             var cityInfo = {
        //                 city: curCity,
        //                 lon: resultData.lat,
        //                 lat: resultData.lon
        //             }
        //             return cityInfo;
        //         }).then(function () {
        //             getWeather(resultData);
        //         });
        //     }
        //     return;
        // });
    });
};

// function clearHistory(event) {
//     event.preventDefault();
//     var pastSearch = document.getElementById('history');

//     localStorage.removeItem("cityData");
//     pastSearch.innerHTML = '';
//     var curConEl = document.getElementById("display");
//     curConEl.innerHTML = '';

//     var fiveForecast = document.getElementById("forecast");
//     fiveForecast.innerHTML = '';

//     return;
// };



cityFormEl.addEventListener('submit', fetchData);
// displayHistory();
// clear.on("click", clearHistory);
// history.on("click", getPast);


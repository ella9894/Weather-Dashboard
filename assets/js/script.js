var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var forecast = document.querySelector('#forecast');
var apiKey = "e76723bec15d4ac7542f1468323edadb";
// var date = moment.format('l');
var search_history = [];




function fetchData() {
    event.preventDefault();
    var cityName = cityInputEl.value;
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appId=${apiKey}&limit=20`).then(function (result) {
        return result.json();
    }).then(function (resultData) {
        var firstResult = resultData[0];
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstResult.lat}&lon=${firstResult.lon}&units=imperial&appid=${apiKey}`).then(function (result) {
            return result.json();
          
        }).then(function (resultData) {
            console.log(resultData);
            
            for (var i = 0; i < resultData.length; i + 5) {
                var icon = `https://api.openweathermap.org/img/w/${resultData.list[0].weather[0].icon}.png`;
                var T = resultData.list[5].main.temp;
                var H = resultData.list[5].main.humidity;
                var W = resultData.list[5].wind.speed;
                console.log(icon)

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


                tempEl.textContent = `Temp: ${T}`;
                humEl.textContent = `Hummiditiy: ${H}`;
                windEl.textContent = `Wind Speed: ${W}`;
                wIcon.setAttribute('src', icon);
            }

forecast.append(col);
           
        })
    });
}



//     var cityName = cityInputEl.value;
//     fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appId=${apiKey}&limit=20`).then(function (result) {
//         return result.json();
//     }).then(function (resultData) {
//         var firstResult = resultData[0];
//         fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${firstResult.lat}&lon=${firstResult.lon}&units=imperial&appId=${apiKey}`).then(function (result) {
//             return result.json();
//         }).then(function (resultData) {
//             console.log(resultData);
//             document.getElementById('temp').innerText = resultData.current.temp;
//             document.getElementById('wind').innerText = resultData.current.wind_speed;
//             document.getElementById('humidity').innerText = resultData.current.humidity;
//             document.getElementById('uvi').innerText = resultData.current.uvi;
//         })
//     }).then(function (forecastData) {
//         var forecastData = forecastData;
//         fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`).then(function (forecast) {
//             console.log(forecast);
//             return forecast.json();
//         })
//         })
// };
    

cityFormEl.addEventListener('submit', fetchData);
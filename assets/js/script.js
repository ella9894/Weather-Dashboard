var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
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
            var foreEl = document.createElement("div");        
            var fiveday = document.querySelector("#fiveday");
            var dayone=resultData.list.
            fiveday.appendChild(foreEl);
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
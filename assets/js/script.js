var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");

function fetchData() {
    event.preventDefault();
    var cityName = cityInputEl.value;
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appId=e76723bec15d4ac7542f1468323edadb&limit=20`).then(function (result) {
        return result.json();
    }).then(function (resultData) {
        var firstResult = resultData[0];
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${firstResult.lat}&lon=${firstResult.lon}&units=imperial&appId=e76723bec15d4ac7542f1468323edadb`).then(function (result) {
            return result.json();
        }).then(function (resultData) {
            console.log(resultData);
            document.getElementById('temp').innerText = resultData.current.temp;
            document.getElementById('wind').innerText = resultData.current.wind_speed;
            document.getElementById('humidity').innerText = resultData.current.humidity;
            document.getElementById('uvi').innerText = resultData.current.uvi;
        }).then(functio
        })
    }
    )
}

cityFormEl.addEventListener('submit', fetchData);
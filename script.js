const API_KEY = "c384b9528baf423eb5341fadf8fe3ac9";

(function() {
    document.getElementById("getCurrent").addEventListener("click", function() {
        const city = document.getElementById("city").value;
        getCurrent(city);
    });
    document.getElementById("getForecast").addEventListener("click", function() {
        const city = document.getElementById("city").value;
        getForecast(city);
    });
}())

async function getCurrent(city) {
    const data = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_KEY}`);
    const json = await data.json();
    console.log(json);
}

async function getForecast(city) {
    const data = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${API_KEY}&days=7`);
    const json = await data.json();
    console.log(json);
}
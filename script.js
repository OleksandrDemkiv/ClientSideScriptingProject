const API_KEY = "c384b9528baf423eb5341fadf8fe3ac9";

(function() {
    getWeather();
}())

async function getWeather() {
    const data = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=Sligo&key=${API_KEY}&days=7`);
    // const data = await fetch(`https://api.weatherbit.io/v2.0/current?city=Sligo&key=${API_KEY}&include=alerts`);
    const json = await data.json();
    console.log(json);
}
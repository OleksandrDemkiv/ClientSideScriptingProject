const API_KEY = "c384b9528baf423eb5341fadf8fe3ac9";

(function() {
    document.getElementById("getCurrent").addEventListener("click", function() {
        doFetch("current");
    });
    document.getElementById("getForecast").addEventListener("click", function() {
        doFetch("forecast");
    });
}())

async function doFetch(option) {
    // get city name
    const city = document.getElementById("city").value;
    
    // check if city is empty, if is, alert user, no fetch done
    if (city === "") {
        alert("Please enter a city");
        return;
    }

    try {
        // if current is selected, fetch current weather data and display it
        if (option === "current") {
                const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_KEY}`);
                
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                
                const json = await response.json();
                displayCurrent(json.data[0]);
        } 
        // else if forecast is selected, fetch forecast weather data and display it
        else if (option === "forecast") {
            const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${API_KEY}&days=7`);
            const days = document.getElementById("days").value;

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const json = await response.json();
            displayForecast(json.city_name, json.country_code, json.data, days);
        }
    }
    catch (error) {
        console.error('Fetch error:', error);
        container.innerHTML += `<p>Error: ${error.message || error}</p>`;
    }
}

async function displayCurrent(data) {
    // create output div
    const outDiv = document.getElementById("current");
    outDiv.innerHTML = ""; // clear output div
    
    // create h3 for "City, Country"
    const h2 = document.createElement("h2");
    h2.innerHTML = `${data.city_name}, ${data.country_code}`;

    // create h4 for "Date, Time"
    const h3 = document.createElement("h3");
    h3.innerHTML = `${data.ob_time.replace(" ", ", ")}`;

    // create div for all info
    const dataDiv = document.createElement("div");
    dataDiv.classList.add("data");

    // create left(img), center(txt), right(txt) divs
    const leftDiv = document.createElement("div");
    const centerDiv = document.createElement("div");
    const rightDiv = document.createElement("div");

    // create img for icon into left div
    const icon = document.createElement("img");
    icon.src = `https://cdn.weatherbit.io/static/img/icons/${data.weather.icon}.png`;
    icon.setAttribute("alt", data.weather.description);
    icon.style.width = "200px";
    icon.style.height = "200px";
    leftDiv.append(icon);

    // temperature element
    const temp = document.createElement("p");
    temp.innerHTML = `Temperature: ${data.temp}°C`;

    // clouds coverage element
    const clouds = document.createElement("p");
    clouds.innerHTML = `Clouds: ${data.clouds}%`;

    // wind speed element
    const wind = document.createElement("p");
    wind.innerHTML = `Wind Speed: ${data.wind_spd} m/s`;

    // add temp, clouds, wind into center div
    centerDiv.append(temp, clouds, wind);

    // feels like temperature element
    const feels = document.createElement("p");
    feels.innerHTML = `Feels Like: ${data.app_temp}°C`;

    // UV index element
    const uv = document.createElement("p");
    uv.innerHTML = `UV Index: ${data.uv}`;

    // add feels like, uv index into right div
    rightDiv.append(feels, uv);

    // add all data divs into main div
    dataDiv.append(leftDiv, centerDiv, rightDiv);

    // add all elements into output div
    outDiv.append(h2, h3, dataDiv);
}

async function displayForecast(city, country, data, days) {
    // create output div
    const outDtiv = document.getElementById("forecast");
    outDtiv.innerHTML = ""; // clear output div

    // create h2 for "City, Country"
    const h2 = document.createElement("h2");
    h2.innerHTML = `${city}, ${country}`;

    // create div for all info
    const dataDiv = document.createElement("div");
    dataDiv.classList.add("data");

    for (let index = 0; index < days; index++) {
        const day = data[index];

        // create div for each day
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");

        // set size for the element (screen width / 8) to have all the elements in one row
        // if devide by 7 it takes to much space, if devide by 9 it looks better
        dayDiv.style.width = `${window.screen.width / 8}px`;

        // create h4 for date
        const date = document.createElement("h4");
        date.innerHTML = day.datetime;
        
        // create img for icon
        const icon = document.createElement("img");
        icon.src = `https://cdn.weatherbit.io/static/img/icons/${day.weather.icon}.png`;
        icon.setAttribute("alt", day.weather.description);

        // create p for min and max temperature
        const temp = document.createElement("p");
        temp.innerHTML = `Temp: ${day.min_temp}°C - ${day.max_temp}°C`;

        // create p for sunrise and sunset times
        const sun = document.createElement("p");
        
        // convert sunrise and sunset timestamps to Date objects
        const sunrise = new Date(day.sunrise_ts * 1000);
        const sunset = new Date(day.sunset_ts * 1000);

        // get time in format HH:MM
        const sunrise_st = `${sunrise.getHours()}:${sunrise.getMinutes()}`;
        const sunset_st = `${sunset.getHours()}:${sunset.getMinutes()}`;
        // and display
        sun.innerHTML = `Sunrise: ${sunrise_st} <br/> Sunset: ${sunset_st}`;
        
        // append all data into day div and then into data div
        dayDiv.append(date, icon, temp, sun);
        dataDiv.append(dayDiv);
    }

    // add all elements into output div
    outDtiv.append(h2, dataDiv);
}
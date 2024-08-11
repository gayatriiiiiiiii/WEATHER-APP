const apiKey = "81cfe094564f2c06741e898f886da63b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherContainer = document.getElementById("weatherContainer");
const errorMessage = document.getElementById("errorMessage");

const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + "&appid=" + apiKey);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} km/h`;

        const weatherMain = data.weather[0].main;
        updateWeatherIconAndBackground(weatherMain);

        weatherContainer.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    } catch (error) {
        weatherContainer.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
}

function updateWeatherIconAndBackground(weatherMain) {
    let iconSrc;
    let backgroundColor;

    switch (weatherMain) {
        case "Clouds":
            iconSrc = "images/clouds.png";
            backgroundColor = "#B0C4DE";
            break;
        case "Clear":
            iconSrc = "images/clear.png";
            backgroundColor = "#FFD700";
            break;
        case "Rain":
            iconSrc = "images/rain.png";
            backgroundColor = "#4682B4";
            break;
        case "Snow":
            iconSrc = "images/snow.png";
            backgroundColor = "#ADD8E6";
            break;
        case "Mist":
        case "Fog":
            iconSrc = "images/mist.png";
            backgroundColor = "#778899";
            break;
        default:
            iconSrc = "images/default.png";
            backgroundColor = "#87CEEB"; // Default sky blue color
            break;
    }

    weatherIcon.src = iconSrc;
    document.body.style.backgroundColor = backgroundColor;
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        checkWeather(city);
    }
});

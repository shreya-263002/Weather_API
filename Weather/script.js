async function getWeather() {
    const city = document.getElementById('city').value.toLowerCase();

    let lat, lon;
    if (city === 'delhi') {
        lat = 28.6139;
        lon = 77.2090;
    } else if (city === 'nainital') {
        lat = 29.3919;
        lon = 79.4542;
    } else if (city === 'bhimtal') {
        lat = 29.3450;
        lon = 79.5348;
    } else if (city === 'haldwani') {
        lat = 29.2193;
        lon = 79.5128;
    } else {
        document.getElementById('weather').innerHTML = `
            <h2>Unknown City</h2>
            <img src="icons/unknown.png" alt="Unknown City" class="weather-icon">
            <p>Weather data not available for this city.</p>
        `;
        return;
    }

    try {
       
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Asia/Kolkata`);
        const weatherData = await weatherResponse.json();
        console.log(weatherData); 

        if (weatherData.current_weather) {
            const currentWeather = weatherData.current_weather;
            const weatherCode = currentWeather.weathercode;
            const weatherImage = getWeatherImage(weatherCode);
            const backgroundImage = getBackgroundImage(weatherCode, city);

            console.log(`images/${backgroundImage}`);


            document.body.style.backgroundImage = `url('images/${backgroundImage}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundPosition = 'center center';

            document.getElementById('weather').innerHTML = `
                <h2>${city.charAt(0).toUpperCase() + city.slice(1)}</h2>
                <img src="${weatherImage}" alt="Weather Icon" class="weather-icon">
                <p>Temperature: ${currentWeather.temperature}°C</p>
                <p>Weather: ${weatherCodeDescription(weatherCode)}</p>
                <p>Wind Speed: ${currentWeather.windspeed} m/s</p>
            `;
        } else {
            document.getElementById('weather').innerHTML = `
                <h2>${city.charAt(0).toUpperCase() + city.slice(1)}</h2>
                <img src="icons/unknown.png" alt="Unknown Weather" class="weather-icon">
                <p>Weather data not found!</p>
            `;
        }

        const dailyData = weatherData.daily;
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = ''; 

        dailyData.temperature_2m_max.slice(1, 4).forEach((maxTemp, index) => {
            const minTemp = dailyData.temperature_2m_min[index + 1];
            const weatherCode = dailyData.weathercode[index + 1];
            const weatherDescription = weatherCodeDescription(weatherCode);
            const weatherIcon = getWeatherImage(weatherCode);

            const forecastDay = document.createElement('div');
            forecastDay.classList.add('forecast-day');
            forecastDay.innerHTML = `
                <img src="${weatherIcon}" alt="Weather Icon">
                <p><strong>Day ${index + 1}</strong></p>
                <p>Max Temp: ${maxTemp}°C</p>
                <p>Min Temp: ${minTemp}°C</p>
                <p>${weatherDescription}</p>
            `;
            forecastContainer.appendChild(forecastDay);
        });
    } catch (error) {
        console.error(error); 
        document.getElementById('weather').innerHTML = `
            <h2>${city.charAt(0).toUpperCase() + city.slice(1)}</h2>
            <img src="icons/unknown.png" alt="Unknown Weather" class="weather-icon">
            <p>Error fetching weather data!</p>
        `;
    }
}

function getWeatherImage(weatherCode) {
    switch (weatherCode) {
        case 0:
            return "icons/day.svg"; // Clear sky
        case 1:
        case 2:
        case 3:
            return "icons/cloudy-day-3.svg"; // Partly cloudy
        case 45:
        case 48:
            return "icons/cloudy.svg"; // Fog
        case 51:
        case 53:
        case 55:
            return "icons/rainy-1.svg"; // Drizzle
        case 61:
        case 63:
        case 65:
            return "icons/rainy-5.svg"; // Rain
        case 71:
        case 73:
        case 75:
            return "icons/snowy-5.svg"; // Snow
        case 80:
        case 81:
        case 82:
            return "icons/rainy-5.svg"; // Shower
        case 95:
        case 96:
        case 99:
            return "icons/thunder.svg"; // Thunderstorm
        default:
            return "icons/unknown.png"; 
    }
}

function getBackgroundImage(weatherCode, city) {
    switch (city) {
        case 'nainital':
            switch (weatherCode) {
                case 0:
                    return "nainital-lake.jpg"; // Clear sky
                case 1:
                case 2:
                case 3:
                    return "nainital-partly-cloudy.jpg"; // Partly cloudy
                case 45:
                case 48:
                    return "nainital-fog.jpg"; // Fog
                case 51:
                case 53:
                case 55:
                    return "nainital-drizzle.jpg"; // Drizzle
                case 61:
                case 63:
                case 65:
                    return "nainital-rain.jpg"; // Rain
                case 71:
                case 73:
                case 75:
                    return "nainital-snow.jpg"; // Snow
                case 80:
                case 81:
                case 82:
                    return "nainital-shower.jpg"; // Shower
                case 95:
                case 96:
                case 99:
                    return "nainital-thunderstorm.jpg"; // Thunderstorm
                default:
                    return "nainital-unknown.jpg"; // Unknown weather
            }
        case 'bhimtal':
            switch (weatherCode) {
                case 0:
                    return "bhimtal.avif"; // Clear sky
                case 1:
                case 2:
                case 3:
                    return "bhimtal-partly-cloudy.jpg"; // Partly cloudy
                case 45:
                case 48:
                    return "bhimtal-fog.jpg"; // Fog
                case 51:
                case 53:
                case 55:
                    return "bhimtal-drizzle.jpg"; // Drizzle
                case 61:
                case 63:
                case 65:
                    return "bhimtal-rain.jpg"; // Rain
                case 71:
                case 73:
                case 75:
                    return "bhimtal-snow.jpg"; // Snow
                case 80:
                case 81:
                case 82:
                    return "bhimtal-shower.jpg"; // Shower
                case 95:
                case 96:
                case 99:
                    return "bhimtal-thunderstorm.jpg"; // Thunderstorm
                default:
                    return "bhimtal-unknown.jpg"; // Unknown weather
            }
        case 'haldwani':
            switch (weatherCode) {
                case 0:
                    return "Haldwani.jpg"; // Clear sky
                case 1:
                case 2:
                case 3:
                    return "haldwani-partly-cloudy.jpg"; // Partly cloudy
                case 45:
                case 48:
                    return "haldwani-fog.jpg"; // Fog
                case 51:
                case 53:
                case 55:
                    return "haldwani-drizzle.jpg"; // Drizzle
                case 61:
                case 63:
                case 65:
                    return "haldwani-rain.jpg"; // Rain
                case 71:
                case 73:
                case 75:
                    return "haldwani-snow.jpg"; // Snow
                case 80:
                case 81:
                case 82:
                    return "haldwani-shower.jpg"; // Shower
                case 95:
                case 96:
                case 99:
                    return "haldwani-thunderstorm.jpg"; // Thunderstorm
                default:
                    return "haldwani-unknown.jpg"; // Unknown weather
            }
        case 'delhi':
            switch (weatherCode) {
                case 0:
                    return "Delhi.webp"; // Clear sky
                case 1:
                case 2:
                case 3:
                    return "delhi-partly-cloudy.jpg"; // Partly cloudy
                case 45:
                case 48:
                    return "delhi-fog.jpg"; // Fog
                case 51:
                case 53:
                case 55:
                    return "delhi-drizzle.jpg"; // Drizzle
                case 61:
                case 63:
                case 65:
                    return "delhi-rain.jpg"; // Rain
                case 71:
                case 73:
                case 75:
                    return "delhi-snow.jpg"; // Snow
                case 80:
                case 81:
                case 82:
                    return "delhi-shower.jpg"; // Shower
                case 95:
                case 96:
                case 99:
                    return "delhi-thunderstorm.jpg"; // Thunderstorm
                default:
                    return "delhi-unknown.jpg"; // Unknown weather
            }
        default:
            return "default.jpg";
    }
}


function weatherCodeDescription(weatherCode) {
    switch (weatherCode) {
        case 0:
            return 'Clear sky';
        case 1:
        case 2:
        case 3:
            return 'Partly cloudy';
        case 45:
        case 48:
            return 'Fog';
        case 51:
        case 53:
        case 55:
            return 'Drizzle';
        case 61:
        case 63:
        case 65:
            return 'Rain';
        case 71:
        case 73:
        case 75:
            return 'Snow';
        case 80:
        case 81:
        case 82:
            return 'Shower';
        case 95:
        case 96:
        case 99:
            return 'Thunderstorm';
        default:
            return 'Unknown weather';
    }
}

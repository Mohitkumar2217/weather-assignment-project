const apiKey = 'fe31427d1b81aafcb783f884e472811c';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

if (typeof document !== "undefined") {
    const searchButton = document.getElementById('searchButton');
    const locationInput = document.getElementById("locationInput");
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    searchButton.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
        }
    });
    
    function fetchWeather(location) {
        const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                locationElement.textContent = data.name;
                temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
                descriptionElement.textContent = data.weather[0].description;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }
} 



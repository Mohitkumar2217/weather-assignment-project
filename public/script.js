async function getWeather() {
  const city = document.getElementById('city').value;
  const res = await fetch(`/api/weather/${city}`);
  const data = await res.json();

  if (data.main) {
    document.getElementById('weatherResult').innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Weather: ${data.weather[0].description}</p>
    `;
    initMap(data.coord.lat, data.coord.lon);
    getForecast(city);
  } else {
    document.getElementById('weatherResult').innerText = 'City not found.';
  }
}

async function getForecast(city) {
  const res = await fetch(`/api/weather/forecast/${city}`);
  const data = await res.json();

  let html = '<h3>5-Day Forecast:</h3>';
  data.list.forEach((item, index) => {
    if (index % 8 === 0) {
      html += `<p>${item.dt_txt}: ${item.main.temp}°C - ${item.weather[0].description}</p>`;
    }
  });

  document.getElementById('forecastResult').innerHTML = html;
}

function initMap(lat = 20.5937, lon = 78.9629) {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat, lng: lon },
  });
  new google.maps.Marker({
    position: { lat, lng: lon },
    map: map,
  });
}

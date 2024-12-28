const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const detailsEl = document.getElementById("details");

document.addEventListener("DOMContentLoaded", function () {
  const placeForm = document.getElementById("send-location");

  placeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const location = cityInputEl.value;
    getLatLong(location);
  });
});

async function getLatLong(location) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search.php?q=${location}&format=jsonv2`
  );

  const [data] = await res.json();
  console.log(data.lat, data.lon);
  getWeatherData(data.lat, data.lon);
}

async function getWeatherData(lat, lon) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,rain,wind_speed_10m`
  );
  const data = await res.json();
  console.log(data.current);

  const temperature = data.current.temperature_2m;
  const rain = data.current.rain;
  const wind = data.current.wind_speed_10m;

  const details = `Weather Details: <br> Temperature: ${temperature} <br> Rain: ${rain} <br> Wind: ${wind}`;
  displayDetails(details);
}

function displayDetails(details) {
  detailsEl.innerHTML = details;
}

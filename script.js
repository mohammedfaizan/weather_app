document.addEventListener("DOMContentLoaded", function () {
  const weatherDataEl = document.getElementById("weather-data");
  const cityInputEl = document.getElementById("city-input");

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
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,rain,wind_speed_10m`
  );
  const data = await res.json();
  console.log(data.current);
}

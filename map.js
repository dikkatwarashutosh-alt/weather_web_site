let check_btn = document.getElementById("check_btn");

// Create map
var map = L.map('map', {
  scrollWheelZoom: true, // enable zooming with scroll
  dragging: true         // enable dragging
}).setView([28.6139, 77.2090], 10);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

var marker = L.marker([28.6139, 77.2090]).addTo(map);

async function getWeather(lat, lng) {
  const url = `https://api.weatherapi.com/v1/current.json?key=d829f60291da4cfc9ea125607250410&q=${lat},${lng}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Store location and temperature only
    const weatherData = {
      location: data.location.name,
      temperature: data.current.temp_c,
      condition: "https:" + data.current.condition.icon,
      cloud_condition: data.current.condition.text,
      humidity: data.current.humidity,
      cloud: data.current.cloud
    };


    if (weatherData) {
      document.getElementById("location").innerText = "📍" + weatherData.location;
      document.getElementById("temp_C").innerText = weatherData.temperature + "°C";
      document.getElementById("icon").src = weatherData.condition;
      document.getElementById("broken_cloud").innerText = weatherData.cloud_condition;
      document.getElementById("humidity_label").innerText = "Humidity:" + weatherData.humidity;
      document.getElementById("cloudy_label").innerText = "Cloud:" + weatherData.cloud;
    }
    else {
      document.body.innerHTML = "<h3>No data found. Please go back and search again.</h3>";
    }
  }
  catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Unable to fetch weather data.");
  }
}

if (navigator.geolocation) {

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      map.setView([lat,lng],10);
      marker.setLatLng([lat,lng]);
      document.getElementById("output").innerText="Latitude: " + lat + " | Longitude: " + lng;

      getWeather(lat, lng);
    },
    () => {
      alert("Location access denied. You can still click on map to choose location.")
    }
  );
} else {
  alert("Geolocation not supported in this browser.");
}




// On map click
map.on('click', function (e) {

  let lat = e.latlng.lat;
  let lng = e.latlng.lng;

  marker.setLatLng(e.latlng); // Move marker
  document.getElementById("output").innerText =
    "Latitude: " + lat + " | Longitude: " + lng;

  check_btn.onclick = () => {
    getWeather(lat, lng);
  };

});
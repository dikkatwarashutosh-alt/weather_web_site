let next_btn = document.getElementById("next_btn");

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

// On map click
map.on('click', function (e) {

  let lat = e.latlng.lat;
  let lng = e.latlng.lng;

  marker.setLatLng(e.latlng); // Move marker
  document.getElementById("output").innerText =
    "Latitude: " + lat + " | Longitude: " + lng;

  next_btn.addEventListener("click", async () => {

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

      // Save data for next.html
      localStorage.setItem("weatherData", JSON.stringify(weatherData));

      // Redirect to next page
      window.location.href = "next.html";
    }
    catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Unable to fetch weather data.");
    }

  });

});
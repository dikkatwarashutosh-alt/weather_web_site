let back_btn = document.getElementById("back_btn");

back_btn.addEventListener("click", () => {
    window.location.href = "index.html";
});

const weatherData = JSON.parse(localStorage.getItem("weatherData"));

if (weatherData) {
    document.getElementById("location").innerText = "📍" + weatherData.location;
    document.getElementById("temp_C").innerText = weatherData.temperature + "°C";
    document.getElementById("icon").src = weatherData.condition;
    document.getElementById("broken_cloud").innerText = weatherData.cloud_condition;
    document.getElementById("humidity_label").innerText="Humidity:"+ weatherData.humidity;
    document.getElementById("cloudy_label").innerText="Cloud:"+ weatherData.cloud;
} 
else {
    document.body.innerHTML = "<h3>No data found. Please go back and search again.</h3>";
}
let submit_btn = document.getElementById("submit_btn");
let input_box = document.getElementById("input_box");




submit_btn.addEventListener("click", async () => {

    const user_input = input_box.value.toLowerCase().trim();


    if (user_input.value === "") {

        // input_box.style.border = "2px solid red";
        // setTimeout(() => {
        //     input_box.style.border = "";
        // }, 2000);
        return;

    }

    const url = `https://api.weatherapi.com/v1/current.json?key=d829f60291da4cfc9ea125607250410 &q=${user_input}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Store location and temperature only
        const weatherData = {
            location: data.location.name,
            temperature: data.current.temp_c,
            condition: "https:" + data.current.condition.icon,
            cloud_condition: data.current.condition.text,
            humidity:data.current.humidity,
            cloud:data.current.cloud
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






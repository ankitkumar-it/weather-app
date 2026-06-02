async function getWeather() {

    const city =
    document.getElementById("city").value;

    document.getElementById("weatherResult").innerHTML =
    "<h3>Loading...</h3>";

    const apiKey =
    "cfc16367764dfe4f9d49a18b86a8b747";

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        const data = await response.json();
        console.log(data);

        if (data.cod == "404") {

            document.getElementById("weatherResult").innerHTML =
            "<h3>City not found</h3>";

            return;
        }

        let condition = data.weather[0].main;
        let icon = "🌍";

        if(condition === "Clear"){
            icon = "☀️";
        }
        else if(condition === "Clouds"){
            icon = "☁️";
        }
        else if(condition === "Rain"){
            icon = "🌧️";
        }
        else if(condition === "Thunderstorm"){
            icon = "⛈️";
        }
        else if(condition === "Snow"){
            icon = "❄️";
        }
        let now = new Date();

        let dateTime =
        now.toLocaleString();
        document.getElementById("weatherResult").innerHTML = `
            <h2>${data.name}</h2>
            <p>${dateTime}</p>
            <h1>${icon}</h1>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>Condition: ${condition}</p>
`       ;

    } catch(error){

         console.log(error);

        document.getElementById("weatherResult").innerHTML =
       "<h3>Error fetching weather data</h3>";
    }
}
document.getElementById("city")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        getWeather();
    }

});
async function getWeather() {

    const city =
    document.getElementById("city").value;

    document.getElementById("weatherResult").innerHTML =
    "<h3>Loading...</h3>";
    getForecast(city);

    const apiKey =
    "cfc16367764dfe4f9d49a18b86a8b747";

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        const data = await response.json();
        console.log(data);
        const lat = data.coord.lat;
const lon = data.coord.lon;

const aqiUrl =
`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

const aqiResponse = await fetch(aqiUrl);
const aqiData = await aqiResponse.json();

const aqi = aqiData.list[0].main.aqi;

let aqiStatus = "";

if(aqi === 1){
    aqiStatus = "Good";
}
else if(aqi === 2){
    aqiStatus = "Fair";
}
else if(aqi === 3){
    aqiStatus = "Moderate";
}
else if(aqi === 4){
    aqiStatus = "Poor";
}
else{
    aqiStatus = "Very Poor";
}
let aqiClass = "";

if(aqi === 1){
    aqiClass = "aqi-good";
}
else if(aqi === 2){
    aqiClass = "aqi-fair";
}
else if(aqi === 3){
    aqiClass = "aqi-moderate";
}
else if(aqi === 4){
    aqiClass = "aqi-poor";
}
else{
    aqiClass = "aqi-very-poor";
}

        if (data.cod == "404") {

            document.getElementById("weatherResult").innerHTML =
            "<h3>City not found</h3>";

            return;
        }

        let condition = data.weather[0].main;
        let windDirection = getWindDirection(data.wind.deg);
        showWeatherAlert(
    condition,
    data.main.temp
);
        let message = "";

if(condition === "Clear"){
    message = "☀️ Perfect day to go outside!";
}
else if(condition === "Clouds"){
    message = "☁️ A calm cloudy day.";
}
else if(condition === "Rain"){
    message = "🌧️ Don't forget your umbrella!";
}
else if(condition === "Thunderstorm"){
    message = "⛈️ Stay indoors and stay safe!";
}
else if(condition === "Snow"){
    message = "❄️ Enjoy the snow!";
}
else{
    message = "🌍 Have a great day!";
}

// clear old animation first
        const anim = document.getElementById("weather-animation");
        anim.innerHTML = "";

        if (condition === "Rain" || condition === "Drizzle") {
            createRain();
        }
        else if (condition === "Snow") {
            createSnow();
        }
        else {
    // no animation for other weather
        anim.innerHTML = "";
        }
        setBackground(condition);
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
        let sunrise =
        new Date(data.sys.sunrise * 1000).toLocaleTimeString();

        let sunset =
        new Date(data.sys.sunset * 1000).toLocaleTimeString();
        let sunsetTime = new Date(data.sys.sunset * 1000);
let nowTime = new Date();

let timeUntilSunset =
    Math.max(0, sunsetTime - nowTime);

let hoursUntilSunset =
    Math.floor(timeUntilSunset / (1000 * 60 * 60));

let minutesUntilSunset =
    Math.floor(
        (timeUntilSunset % (1000 * 60 * 60))
        / (1000 * 60)
    );
        document.getElementById("weatherResult").innerHTML = `
          <h2>
<img 
    src="https://flagcdn.com/24x18/${data.sys.country.toLowerCase()}.png"
    alt="${data.sys.country} flag">
${data.name}, ${data.sys.country}
</h2>
            <p>🕒 Last updated: ${dateTime}</p>

            <div class="weather-icon">${icon}</div>

            <h1 class="temp">${Math.round(data.main.temp)}°C</h1>
<div class="stats">

    <div class="stat-card">
        <h3>🤗</h3>
        <p>${Math.round(data.main.feels_like)}°C</p>
        <span>Feels Like</span>
    </div>

    <div class="stat-card">
        <h3>💧</h3>
        <p>${data.main.humidity}%</p>
        <span>Humidity</span>
    </div>

    <div class="stat-card">
        <h3>🧭</h3>
        <p>${data.main.pressure}</p>
        <span>Pressure</span>
    </div>

    <div class="stat-card">
    <h3>🌬️</h3>
    <p>${data.wind.speed} m/s</p>
    <span>Wind</span>
    <p>🧭 ${windDirection}</p>
</div>

<div class="stat-card">
    <h3>👀</h3>
    <p>${(data.visibility / 1000).toFixed(1)} km</p>
    <span>Visibility</span>
</div>

    <div class="stat-card aqi-card ${aqiClass}">
    <h3>🌿</h3>
    <p>${aqi}</p>
    <span>Air Quality: ${aqiStatus}</span>
</div>

</div>

<p>🌤️ Condition: ${condition}</p>

<p>🌿 AQI: ${aqi}</p>
<p>📊 Air Quality: ${aqiStatus}</p>

<p>🌅 Sunrise: ${sunrise}</p>
<p>🌇 Sunset: ${sunset}</p>
<p>⏳ Sunset in: ${hoursUntilSunset}h ${minutesUntilSunset}m</p>
<p><b>${message}</b></p>
`      

    }catch(error){

    console.log(error);

    document.getElementById("weatherResult").innerHTML =
"<div class='loader'></div>";
}
    }

function getLocationWeather(){

    alert("Button clicked");

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(

            async function(position){

              alert("Location received");

              const lat = position.coords.latitude;
              const lon = position.coords.longitude;

              const apiKey =
              "cfc16367764dfe4f9d49a18b86a8b747";

              const url =
             `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

              const response = await fetch(url);

              const data = await response.json();

              document.getElementById("city").value =
              data.name;

              getWeather();
        },

        function(error){

             alert("Location Error: " + error.message);

        }

);

    } else {

        alert("Geolocation not supported");
    }
}
document.getElementById("city")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        getWeather();
    }

});
function setBackground(condition) {

    document.body.className = ""; // reset old theme

    if (condition === "Clear") {
        document.body.classList.add("clear");
    }
    else if (condition === "Clouds") {
        document.body.classList.add("cloudy");
    }
    else if (condition === "Rain" || condition === "Drizzle") {
        document.body.classList.add("rainy");
    }
    else if (condition === "Thunderstorm") {
        document.body.classList.add("stormy");
    }
    else if (condition === "Snow") {
        document.body.classList.add("snowy");
    }
    else {
        document.body.classList.add("default");
    }
}
function createRain() {

    const container = document.getElementById("weather-animation");
    container.innerHTML = "";

    for (let i = 0; i < 80; i++) {

        let drop = document.createElement("div");
        drop.classList.add("drop");

        drop.style.left = Math.random() * 100 + "vw";
        drop.style.animationDuration = (0.5 + Math.random()) + "s";
        drop.style.opacity = Math.random();

        container.appendChild(drop);
    }
}
function createSnow() {

    const container = document.getElementById("weather-animation");
    container.innerHTML = "";

    for (let i = 0; i < 60; i++) {

        let snow = document.createElement("div");
        snow.classList.add("snow");

        snow.style.left = Math.random() * 100 + "vw";
        snow.style.animationDuration = (3 + Math.random() * 3) + "s";
        snow.style.opacity = Math.random();

        container.appendChild(snow);
    }
}
function toggleDarkMode(){

    document.body.classList.toggle("dark-mode");

}
async function getForecast(city){

    const apiKey =
    "cfc16367764dfe4f9d49a18b86a8b747";

    const url =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    const data = await response.json();

    let forecastHTML = "";

for(let i = 0; i < 40; i += 8){

    let day = new Date(data.list[i].dt_txt)
    .toLocaleDateString("en-US", {
        weekday: "short"
    });

    let temp =
    Math.round(data.list[i].main.temp);

    let condition =
    data.list[i].weather[0].main;

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
    else if(condition === "Snow"){
        icon = "❄️";
    }

    forecastHTML += `
        <div class="forecast-card">
            <h4>${day}</h4>
            <p>${icon}</p>
            <p>${temp}°C</p>
        </div>
    `;
}

document.getElementById("forecast").innerHTML =
forecastHTML;
createTemperatureChart(data);
}function createTemperatureChart(data){

    const labels = [];
    const temperatures = [];

    for(let i = 0; i < 8; i++){

        let date = new Date(data.list[i].dt_txt);

        let time = date.toLocaleTimeString("en-US", {
            hour: "numeric"
        });

        labels.push(time);

        temperatures.push(
            Math.round(data.list[i].main.temp)
        );
    }

    const ctx =
    document.getElementById("tempChart");

    new Chart(ctx, {

        type: "line",

        data: {

            labels: labels,

            datasets: [{
                label: "Temperature °C",
                data: temperatures,
                tension: 0.4
            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {
                    beginAtZero: false
                }

            }

        }

    });
}
function addFavorite(){

    const city =
    document.getElementById("city").value;

    if(city === ""){
        alert("Please enter a city first");
        return;
    }

    let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

    if(!favorites.includes(city)){

        favorites.push(city);

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

        showFavorites();

    }else{

        alert("City is already in favorites");
    }
}
function showFavorites(){

    let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

    let html = "";

    favorites.forEach(city => {

       html += `
    <button onclick="selectFavorite('${city}')">
        ⭐ ${city}
    </button>

    <button onclick="removeFavorite('${city}')">
        ❌
    </button>
`;
    });

    document.getElementById("favorites").innerHTML =
    html;
}
function selectFavorite(city){

    document.getElementById("city").value = city;

    getWeather();
}
showFavorites();



function showWeatherAlert(condition, temperature){

    let alertBox =
    document.getElementById("weatherAlert");

    alertBox.innerHTML = "";

    if(condition === "Thunderstorm"){

        alertBox.innerHTML =
        "⛈️ <b>Weather Alert:</b> Thunderstorm expected. Stay safe indoors!";

    }
    else if(condition === "Rain"){

        alertBox.innerHTML =
        "🌧️ <b>Weather Alert:</b> Rain expected. Don't forget your umbrella!";

    }
    else if(condition === "Snow"){

        alertBox.innerHTML =
        "❄️ <b>Weather Alert:</b> Snow expected. Stay warm!";

    }
    else if(temperature >= 40){

        alertBox.innerHTML =
        "🌡️ <b>Heat Alert:</b> Very high temperature. Stay hydrated!";

    }
}
function removeFavorite(city){

    let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(
        item => item !== city
    );

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    showFavorites();
}function getFlagEmoji(countryCode){

    return countryCode
        .toUpperCase()
        .replace(/./g, char =>
            String.fromCodePoint(
                127397 + char.charCodeAt()
            )
        );
}
function getWindDirection(degrees){

    const directions = [
        "N", "NE", "E", "SE",
        "S", "SW", "W", "NW"
    ];

    const index =
        Math.round(degrees / 45) % 8;

    return directions[index];
}
function showSection(sectionId){

    document.querySelectorAll(".page-section")
    .forEach(section => {
        section.style.display = "none";
    });

    document.getElementById(sectionId)
    .style.display = "block";
}

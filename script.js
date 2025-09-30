const apikey = "269b9a9f11ea51db0bb8ed39d6bb4450";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-bar input");
const searchbtn = document.querySelector(".search-bar button");
const toggleBtn = document.getElementById("toggle-unit");
const datetimeEl = document.getElementById("datetime");

let tempInCelsius = true;

async function checkWeather(city) {
    try {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);
    var data = await response.json();
    
    if (data.cod === "404"){
        alert("City Not found");
        return;
    }

    console.log(data);
     const condition = data.weather[0].main;
  
    
    document.querySelector(".city").innerHTML = data.name;
    let temp = Math.round(data.main.temp);
    document.querySelector(".temp").innerHTML = temp + (tempInCelsius ? "°C" : "°F");
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".show").innerHTML = condition;
   
   
    document.querySelector(".card").style.background = getGradient(condition);
    // document.querySelector(".show").style.background = getGradient(condition);

    const iconcode = data.weather[0].icon;
    document.querySelector(".weather-icon").src= `https://openweathermap.org/img/wn/${iconcode}@2x.png`;
    

} catch (error){
    console.error(error);
}
}




 searchBox.addEventListener("keypress", function(event) {
        if(event.key === "Enter"){
            checkWeather(searchBox.value);
        }
    });


searchbtn.addEventListener("click", ()=> {
    checkWeather(searchBox.value);

});

toggleBtn.addEventListener("click", () => {
    tempInCelsius = !tempInCelsius;
    let tempEl = document.querySelector(".temp");
    let tempValue = parseInt(tempEl.innerHTML);
    if (tempInCelsius) tempEl.innerHTML = Math.round((tempValue - 32) * 5 / 9) + "°C";
    else tempEl.innerHTML = Math.round(tempValue * 9 / 5 + 32) + "°F";
});

setInterval(() => {
    let now = new Date();
    datetimeEl.innerHTML = now.toLocaleString();
}, 1000);


function getGradient(condition) {
    switch (condition.toLowerCase()) {
        case "clear":
            return "linear-gradient(135deg, #97906eff, #ff4e50)"; 
        case "clouds":
            return "linear-gradient(135deg, #bdc3c7, #2c3e50)"; 
        case "rain":
            return "linear-gradient(135deg, #00c6ff, #0072ff)"; 
        case "snow":
            return "linear-gradient(135deg, #83a4d4, #b6fbff)"; 
        case "thunderstorm":
            return "linear-gradient(135deg, #232526, #414345)"; 
        default:
            return "linear-gradient(135deg, #00feba, #5b548a)"; 
    }
}

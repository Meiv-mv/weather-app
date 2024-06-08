const weatherBox = document.querySelector(".weather-box")
const errorBox = document.querySelector(".error-box")
const searchBtn = document.querySelector(".search-btn")
const main = document.querySelector("main")
const searchBar = document.querySelector(".search-bar")

searchBtn.addEventListener("click", function(){
  const APIkey = "21ea3aed0c038dd87da48751494a078f"
  const city = searchBar.value
  
  if (city === ""){
    return
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`)
  .then(response => response.json())
  .then(json => {

    errorBox.style.display = "none"
    weatherBox.style.display = "none"


    if(json.cod === "404"){
      errorBox.style.display = "flex"
      main.style.height = "320px"
      return    
    }

    const weatherIcon = document.getElementById("weather-icon")
    const cityName = document.querySelector(".city")
    const temperature = document.querySelector(".temperature")
    const weatherDescription = document.querySelector(".weather-description")
    const wind = document.getElementById("wind-value")
    const humidity = document.getElementById("humidity-value")
    const cloudiness = document.getElementById("cloudiness-value")
    const id = json.weather[0].id

    // weatherIcon.src = `https://openweathermap.org/img/wn/${json.weather[0].icon}.png` 
    // using this if a want to take image directly with the APIs, but the quality is low

    if (id === 800){
      weatherIcon.src = "assets/img/weather-condition/clear-sky.svg"
    } else if(id === 801){
      weatherIcon.src = "assets/img/weather-condition/few-clouds.svg"
    } else if(id === 802){
      weatherIcon.src = "assets/img/weather-condition/scattered-clouds.svg"
    } else if(id === 803 || id === 804){
      weatherIcon.src = "assets/img/weather-condition/broken-clouds.svg"
    } else if(id === 520 || id === 521 || 300 <= id <= 302 || 310 <= id <= 314 || id === 321){
      weatherIcon.src = "assets/img/weather-condition/shower-rain.svg"
    } else if(500 <= id <= 504){
      weatherIcon.src = "assets/img/weather-condition/rain.svg"
    } else if(200 <= id <= 202 || 210 <= id <= 212 || id === 221 || 230 <= id <= 232){
      weatherIcon.src = "assets/img/weather-condition/thunderstorm.svg"
    } else if(id === 511 || 600 <= id <= 602 || 611 <= id <= 613 || id === 615 || id === 616 || 620 <= id <= 622){
      weatherIcon.src = "assets/img/weather-condition/snow.svg"
    } else if(id === 701 || id === 711 || id === 721 || id === 731 || id === 741 || id === 751 || id === 761 || id === 762 || id === 771 || id === 781){
      weatherIcon.src = "assets/img/weather-condition/mist.svg"
    } else{
      weatherIcon.src = "assets/img/weather-icon.svg"
    }

    temperature.innerHTML = `${parseInt(json.main.temp)}°C`
    cityName.innerHTML = json.name
    weatherDescription.innerHTML = json.weather[0].description
    wind.innerHTML = `${json.wind.speed}m/s`
    humidity.innerHTML = `${json.main.humidity}%`
    cloudiness.innerHTML = `${json.clouds.all}%`

    weatherBox.style.display = "flex"
    main.style.height = "520px"

  })

})
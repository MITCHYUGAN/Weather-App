const locationInput = document.getElementById("location")
const form = document.querySelector("form")
const loader = document.querySelector(".loader")

const currenttime = document.querySelector(".currenttime")
const currentWeather = document.querySelector(".currentWeather")
const currentTempImg = document.querySelector(".currentTempImg")
const currentTemp = document.querySelector(".currentTemp")
const currentfeelslike = document.querySelector(".currentfeelslike")
const currentcondition = document.querySelector(".currentcondition")
const currentprecipitation = document.querySelector(".currentprecipitation")


const otherdaysheadingtext = document.querySelector(".otherdaysheadingtext")
const otherdaysWrapper = document.querySelector(".otherdaysWrapper")

let locationinput;

locationInput.addEventListener("input", () => {
    locationinput = locationInput.value
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    fetchWeatherData(locationinput)
    currentWeather.classList.remove("active")
    otherdaysWrapper.classList.remove("active")
    otherdaysheadingtext.classList.remove("active")
    loader.classList.add("active")
    otherdaysWrapper.innerHTML = ""
    setInterval(() => {
        loader.classList.remove("active")
        currentWeather.classList.add("active")
        otherdaysWrapper.classList.add("active")
        otherdaysheadingtext.classList.add("active")
    }, 2000);
})

async function fetchWeatherData(location) {
    const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=B79TPAYKK73A5JNQBW3D5TTGX`,
        { mode: "cors" })
    const weatherData = await data.json()

    currentweather(weatherData)
    otherDays(weatherData)

    console.log("we", weatherData.currentConditions);
}


function currentweather(weatherData){
    currenttime.textContent = weatherData.currentConditions.datetime
    currentTemp.textContent = weatherData.currentConditions.temp
    currentfeelslike.textContent = weatherData.currentConditions.feelslike
    currentcondition.textContent = weatherData.currentConditions.conditions
    currentprecipitation.textContent = weatherData.currentConditions.precipprob

    let weatherCondition = weatherData.currentConditions.conditions
    determineEmoji(weatherCondition)
}

function otherDays(weatherData){
    const otherdaysdateWrapper = document.createElement("div")
    otherdaysdateWrapper.className = "otherdays"
    const otherconditionWrapper = document.createElement("div")
    otherconditionWrapper.className = "otherdays"
    const otherdaystempmaxWrapper = document.createElement("div")
    otherdaystempmaxWrapper.className = "otherdays extra"
    const otherdaystempminWrapper = document.createElement("div")
    otherdaystempminWrapper.className = "otherdays extra"

    weatherData.days.forEach((day) => {
        const otherdaysdate = document.createElement("h4")
        otherdaysdate.textContent = day.datetime

        let emoji;
        let otherdaysConditions = day.conditions

        if (otherdaysConditions === "Partially cloudy") {
            emoji = "⛅"
        } else if (otherdaysConditions === "Overcast"){
            emoji = "☁️"
        } else if (otherdaysConditions === "Clear"){
            emoji = "☀️"
        } else if (otherdaysConditions === "Rain, Overcast"){
            emoji = "🌧️"
        }else if (otherdaysConditions === "Rain, Partially cloudy"){
            emoji = "🌦️"
        }

        const otherdayscondition = document.createElement("p")
        otherdayscondition.textContent = emoji + " " + day.conditions

        const otherdaystempmax = document.createElement("h5")
        otherdaystempmax.textContent = `High ${day.tempmax}`

        const otherdaystempmin = document.createElement("h5")
        otherdaystempmin.textContent = `Low ${day.tempmin}`

        otherdaysdateWrapper.appendChild(otherdaysdate)
        otherconditionWrapper.appendChild(otherdayscondition)
        otherdaystempmaxWrapper.appendChild(otherdaystempmax)
        otherdaystempminWrapper.appendChild(otherdaystempmin)
        otherdaysWrapper.appendChild(otherdaysdateWrapper)
        otherdaysWrapper.appendChild(otherconditionWrapper)
        otherdaysWrapper.appendChild(otherdaystempmaxWrapper)
        otherdaysWrapper.appendChild(otherdaystempminWrapper)

    });
}

function determineEmoji(weatherCondition){
    if (weatherCondition === "Partially cloudy") {
        currentTempImg.textContent = "⛅"
    } else if (weatherCondition === "Overcast"){
        currentTempImg.textContent = "☁️"
    } else if (weatherCondition === "Clear"){
        currentTempImg.textContent = "☀️"
    } else if (weatherCondition === "Rain, Overcast"){
        currentTempImg.textContent = "🌧️"
    }else if (weatherCondition === "Rain, Partially cloudy"){
        currentTempImg.textContent = "🌦️"
    }
}

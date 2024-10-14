async function checkWeather(cityName) {
  const response = await fetch(apiUrl + `&appid=${apiKey}` + `&q=${cityName}`);
  var data = await response.json();

  const weatherIcon = document.querySelector(".weather-icon");
  //   console.log(data);

  if (data.message === "bad query" || data.cod === "404") {
    document.querySelector("h1").innerHTML = "Existing? :(";
    document.querySelector(".city").innerHTML = "";
    document.querySelector(".temp").innerHTML = "";
    document.querySelector(".humidity").innerHTML = "";
    document.querySelector(".wind").innerHTML = "";
    document.querySelector(".tag").innerHTML = "";
    weatherIcon.src = "";
    return;
  } else {
    document.querySelector("h1").innerHTML = "";
    const bg = document.querySelector(".root");

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
    document.querySelector(".tag").innerHTML =
      "( it feel's like " + data.main.feels_like + "°C )";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
      bg.style.background = "linear-gradient(135deg, #0077b6, #90e0ef)";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
      bg.style.background = "linear-gradient(135deg, #ff8d21, #ffcd90)";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
      bg.style.background = "linear-gradient(135deg, #92C7CF, #FBF9F1)";
    } else if (
      data.weather[0].main == "Drizzle" ||
      data.weather[0].main == "Snow"
    ) {
      weatherIcon.src = "images/drizzle.png";
      bg.style.background = "linear-gradient(135deg, #3A1078, #3795BD)";
    } else if (
      data.weather[0].main == "Mist" ||
      data.weather[0].main == "Snow"
    ) {
      weatherIcon.src = "images/mist.png";
      bg.style.background = "linear-gradient(135deg, #0d86c8, #F1D3CE)";
    }

    img2Element.src = "images/humidity.png";
    humid.appendChild(img2Element);
    imgElement.src = "images/wind.png";
    windIcon.appendChild(imgElement);
    return;
  }
}

const apiKey = "__enter__your__api__key__";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const imgElement = document.createElement("img");
const windIcon = document.querySelector(".wind");

const img2Element = document.createElement("img");
const humid = document.querySelector(".humidity");

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const cityValue = document.getElementById("cityInput").value;
    // console.log(cityValue);
    checkWeather(cityValue);
  });

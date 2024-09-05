const url = "https://api.openweathermap.org/data/2.5/";
const key = "1b49719169e48516aafdf0c011b384ac";

const setQuery = (e) => {
  if (e.keyCode == "13")
    // bu enter tuşunun key kodunu belli ediyor (13)bilmezsin tabi
    getResult(searchBar.value);
};

const getResult = (cityName) => {
  let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
  fetch(query)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult);
};

// aşağıdaki de async ve await kullanılmış hali

/*
const getResult = async (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`

    try {
        const response = await fetch(query); // fetch'in tamamlanmasını bekle
        const weather = await response.json(); // JSON'a çevrilmesini bekle
        displayResult(weather); // Sonucu göster
    } catch (error) {
        console.error("Bir hata oluştu: ", error); // Hataları yakala
    }
}
*/

const displayResult = (result) => {
  let city = document.querySelector(".city");
  city.innerText = `${result.name}, ${result.sys.country}`;

  let temp = document.querySelector(".temp");
  temp.innerText = `${Math.round(result.main.temp)} °C `;

  let desc = document.querySelector(".desc");
  desc.innerText = `${result.weather[0].main}`;

  let minmax = document.querySelector(`.minmax`);
  minmax.innerText = `${Math.round(result.main.temp_min)} °C / ${Math.round(
    result.main.temp_max
  )} °C `;

  document
    .querySelectorAll(".rain-drop, .snow-fall, .clouds, .sun")
    .forEach((el) => (el.style.display = "none"));

  switch (result.weather[0].main) {
    case "Rain":
      document .querySelectorAll(".rain-drop").forEach((el) => (el.style.display = "block"));
      //document.body.style.backgroundImage = "url(istanbul.jpg)";
      document.body.style.background = "rgb(150,150,150);";
      document.body.style.background = "linear-gradient(180deg, rgba(150,150,150,1) 0%, rgba(68,110,222,1) 56%)";
      break;
    case "Snow":
      document.querySelectorAll(".snow-fall").forEach((el) => (el.style.display = "block"));
      document.body.style.background = "rgb(70,70,70)";
      document.body.style.background = "linear-gradient(180deg, rgba(70,70,70,1) 0%, rgba(118,143,175,1) 56%)";
      break;
    case "Clouds":
      document.querySelectorAll(".clouds").forEach((el) => (el.style.display = "block"));
      //document.body.style.backgroundImage = "url(edinburgh-4491305_1280.jpg)";
      document.body.style.background = "rgb(95,96,98)";
      document.body.style.background = "linear-gradient(180deg, rgba(95,96,98,1) 0%, rgba(61,84,147,1) 56%)";
      break;
    case "Clear":
      document.querySelector(".sun").style.display = "block"
      //document.body.style.backgroundImage = "url(antep.jpg)";
      document.body.style.background = "rgb(16, 33, 106)";
      document.body.style.background = "linear-gradient(180deg, rgba(16, 33, 106, 1) 0%,rgba(47, 126, 221, 1) 56%)";
      break;
    default:
      break;
  }
};

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keypress", setQuery);

// yağmur damlaları

const rain = () => {
  for (let i = 0; i < 100; i++) {
    const drop = document.createElement("div");
    drop.classList.add("rain-drop");
    drop.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
    drop.style.top = Math.floor(Math.random() * window.innerHeight) + "px";
    drop.style.animationDuration = 0.6 + Math.random() * 1 + "s";
    document.body.appendChild(drop);
  }
};
rain();

//kar yağması
const snow = () => {
  for (let i = 0; i < 100; i++) {
    const fall = document.createElement("div");
    fall.classList.add("snow-fall");
    fall.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
    fall.style.top = Math.floor(Math.random() * window.inner) + "px";
    fall.style.animationDuration = 1.5 + Math.random() * 1.5 + "s";
    document.body.appendChild(fall);
  }
};

snow();


/*const clear = (a) => {
    for (let i = 0; i < a; i++) {
      const gunes = document.createElement("div");
      gunes.classList.add("sun");
      document.body.appendChild(gunes);
    }
  };

clear()*/

/*function createSun(count) {
    const weatherContainer = document.querySelector(".weather");

    for (let i = 0; i < count; i++) {
        const gunes = document.createElement("div");
        gunes.classList.add("suns");

    weatherContainer.appendChild(gunes);
}}

createSun();*/

// bulut çoğaltma
function createClouds(count) {
  const weatherContainer = document.querySelector(".weather");

  for (let i = 0; i < count; i++) {
    const cloud = document.createElement("div");
    cloud.style.marginTop = "50px";
    cloud.style.marginLeft = "60px";
    cloud.classList.add("clouds");
    weatherContainer.appendChild(cloud);
  }
}

createClouds(3);

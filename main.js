const input = document.getElementById("location");
const toggle = document.querySelector('.tgl');

function setDisplay(data) {
  const city = document.querySelector(".city");
  const country = document.querySelector(".country");
  const temp = document.querySelector(".temp");

  if (toggle.checked == false) {
    temp.textContent = data.current.temp_c + "°C";
  } else {
    temp.textContent = data.current.temp_f + "°F";
  }

  toggle.addEventListener('change', function (e) {
    setDisplay(data);
    console.log("Hello")
  },{once: true})
  
  city.textContent = data.location.name;
  country.textContent = data.location.country;
}

async function getLocationWeather(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=748e068244b54ec68f3104838230810&q=${location}`
    );
    const data = await response.json();
    console.log(data);
    setDisplay(data);
  } catch (err) {
    throw new Error(err);
  }
}

input.addEventListener("keydown", function (event) {
  // console.log(event.code);
  if (event.code === "Enter") {
    event.preventDefault();
    if (!input.value) {
      return;
    }
    getLocationWeather(input.value);
    input.value = "";
  }
});

const body = document.querySelector('body');
const input = document.getElementById("location");
const toggle = document.querySelector('.tgl');
const toggleContainer = document.querySelector('.toggle');
const cond = document.querySelector('.cond');
const errorDialog = document.querySelector('#error')
const loading = document.querySelector('.loading');

function setDisplay(data) {
  const city = document.querySelector(".city");
  const country = document.querySelector(".country");
  const temp = document.querySelector(".temp");

  const condition = data.current.condition.text;

  if (condition.toLowerCase().includes('cloud') || condition === 'Overcast' ) {
    body.style.backgroundImage = "url('assets/cloud.png')"
  } else if (condition.toLowerCase().includes('rain')) {
    body.style.backgroundImage = "url('assets/rain.jpg')"
  } else if (condition.toLowerCase().includes('sun') || condition === 'Clear') {
    body.style.backgroundImage = "url('assets/sun.jpg')"
  } else if (condition.toLowerCase().includes('mist')) {
    body.style.backgroundImage = "url('assets/mist.jpg')"
  } else {
    body.style.backgroundImage = "url('assets/default.jpg')"
  }

  if (toggle.checked == false) {
    temp.textContent = data.current.temp_c + "°C";
  } else {
    temp.textContent = data.current.temp_f + "°F";
  }

  toggleContainer.classList.add('toggle-visible')

  toggle.addEventListener('change', function (e) {
    setDisplay(data);
    console.log("Hello")
  },{once: true})
  
  city.textContent = data.location.name;
  country.textContent = data.location.country;
  cond.textContent = condition;
}

async function getLocationWeather(location) {
  loading.classList.add('load-visible')
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=748e068244b54ec68f3104838230810&q=${location}`
    );
    const data = await response.json();
    console.log(data);
    setDisplay(data);
    loading.classList.remove('load-visible');
  } catch (err) {
    loading.classList.remove('load-visible');
    errorDialog.classList.add('error-visible');
    setTimeout(() => {
      errorDialog.classList.remove('error-visible');
    }, 2000)
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

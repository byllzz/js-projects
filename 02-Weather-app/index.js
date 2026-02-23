const styles = {
  wrapperStyles: {
    width: 100,
    height: 100,
    maxWidth: 1200,
    marginX: 'auto',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  inputStyles: {
    width: 100,
    maxWidth: 400,
    marginX: 'auto',
    height: 50,
    paddingInline: 20,
    paddingBlock: 5,
    borderRadius: 999,
    fontSize: 18,
  },
};

function wrapper() {
  const wrapper = document.createElement('div');

  wrapper.style.width = `${this.wrapperStyles.width}%`;
  wrapper.style.maxWidth = `${this.wrapperStyles.maxWidth}px`;
  wrapper.style.height = `${this.wrapperStyles.height}vh`;
  wrapper.style.marginInline = this.wrapperStyles.marginX;
  wrapper.style.padding = `${this.wrapperStyles.padding}px`;
  wrapper.style.display = this.wrapperStyles.display;
  wrapper.style.flexDirection = this.wrapperStyles.flexDirection;
  wrapper.style.alignItems = this.wrapperStyles.alignItems;
  wrapper.style.gap = `${this.wrapperStyles.gap}px`;

  document.body.appendChild(wrapper);

  wrapper.innerHTML = `
    <input
      type="search"
      id="input_field"
      placeholder="Search City"
      style="
        width:${this.inputStyles.width}%;
        max-width:${this.inputStyles.maxWidth}px;
        height:${this.inputStyles.height}px;
        border-radius:${this.inputStyles.borderRadius}px;
        padding-block:${this.inputStyles.paddingBlock}px;
        padding-inline:${this.inputStyles.paddingInline}px;
        margin-inline:${this.inputStyles.marginX};
        font-size:${this.inputStyles.fontSize}px"
    />

    <h1 id="city-title">Search City...</h1>
    <h2 id="country"></h2>

    <img id="weather-icon" src="./assests/sunny.png" width="120" height="120"/>

    <h1 id="temp-title"></h1>
    <p id="description"></p>

    <div id="extra-info"></div>
  `;
}

wrapper.call(styles);

const input = document.querySelector('#input_field');
const cityTitle = document.querySelector('#city-title');
const tempCity = document.querySelector('#temp-title');
const description = document.querySelector('#description');
const countryEl = document.querySelector('#country');
const extraInfo = document.querySelector('#extra-info');
// const weatherIcon = document.querySelector('#weather-icon');

input.addEventListener('change', function (e) {
  let city = e.target.value.trim();
  if (!city) return alert('Please enter city name!');

  fetchWeather(city);
  e.target.value = '';
});

function fetchWeather(city) {
  const apiKey = 'b1fd6e14799699504191b6bdbcadfc35';   // remember this is a public api so if it not works then its ok ...
  const unit = 'metric';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  fetch(apiUrl)
    .then(res => {
      if (!res.ok) throw new Error('City not found');
      return res.json();
    })
    .then(data => {
      updateUI(data);
      saveToLocal(data);
    })
    .catch(err => {
      alert(err.message);
    });
}

function updateUI(data) {
  const { name, main, weather, wind, sys, timezone } = data;

  cityTitle.textContent = name;
  countryEl.textContent = sys.country;

  tempCity.textContent = `${main.temp}°C`;
  description.textContent = weather[0].description.toUpperCase();

  // weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  const localTime = new Date(Date.now() + timezone * 1000).toUTCString().slice(-12, -4);

  extraInfo.innerHTML = `
    <p>🌡 Feels Like: ${main.feels_like}°C</p>
    <p>💧 Humidity: ${main.humidity}%</p>
    <p>🌬 Wind Speed: ${wind.speed} m/s</p>
    <p>🕒 Local Time: ${localTime}</p>
  `;
}

function saveToLocal(data) {
  localStorage.setItem('weatherData', JSON.stringify(data));
}

window.addEventListener('load', () => {
  const stored = localStorage.getItem('weatherData');
  if (stored) {
    updateUI(JSON.parse(stored));
  }
});

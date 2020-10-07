// Documentation: https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf
serverEndpoint = 'https://api.nasa.gov/insight_weather/?api_key=MvvlPiedxmmIBY45P0Dboo28sPGbopdXaZ7iqamW&feedtype=json&ver=1.0';
// ToDo: https://cloudcannon.com/deconstructions/2014/11/15/facebook-content-placeholder-deconstruction.html
// add 3 placeholders that have the same effect as facebook comments loading

const fetchData = function () {
  fetch(serverEndpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      getWeatherData(json);
    });
};

const getWeatherData = function (json) {
  let windList = [],
    keys = [],
    avTemps = [],
    mnTemps = [],
    mxTemps = [],
    dates = [],
    windDirections = [],
    html = '';

  const monthNames = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

  for (let days of json.sol_keys) {
    keys.push(days);
  }

  let avTemp, mnTemp, mxTemp, wind, dt, day, month;
  console.log(json);
  for (let i = 0; i < 6; i++) {
    dt = new Date(json[keys[i]].Last_UTC);
    wind = json[keys[i]].WD.most_common.compass_degrees;
    avTemp = FahrenheitToCelsius(json[keys[i]].AT.av);
    mnTemp = FahrenheitToCelsius(json[keys[i]].AT.mn);
    mxTemp = FahrenheitToCelsius(json[keys[i]].AT.mx);
    day = dt.getDate().toString();
    month = monthNames[dt.getMonth()];
    windList.push(wind);
    windDirections.push(getDirection(windList[i]));
    dates.push(month + ' ' + day);
    avTemps.push(avTemp);
    mnTemps.push(mnTemp);
    mxTemps.push(mxTemp);
  }

  // insert on page
  for (let i = 0; i < keys.length - 1; i++) {
    if (i < 3) {
      string = `
      <div class="c-weather__secondpage">
      <div class="c-weather-body">
        <div class="c-weather-header">Sol ${keys[i]}</div>
        <div class"c-weather-subheader>${dates[i]}</div>
        <hr />
        <div class="c-weather-high">
          <div class="c-weather-text">Hi:</div>
          <div class="c-weather-value">${mxTemps[i]} °C</div>
        </div>
        <div class="c-weather-low">
          <div class="c-weather-text">Lo:</div>
          <div class="c-weather-value">${mnTemps[i]} °C</div>
        </div>
        <div class="c-weather-average">
          <div class="c-weather-text">Av:</div>
          <div class="c-weather-value">${avTemps[i]} °C</div>
        </div>
        <svg id=${i} class="c-compass" xmlns="http://www.w3.org/2000/svg" width="105" height="105" viewBox="0 0 105 105">
        <title>Windroos</title>
        <g transform="translate(-113 -370.479)">
          <path d="M8.3,0l8.3,34.8H0Z" transform="translate(173.607 458.071) rotate(180)" fill="#fff" />
          <path d="M8.3,0l8.3,34.8H0Z" transform="translate(157 388.48)" fill="#e3dddd" />
        </g>
        <g fill="none" stroke="#fff" stroke-width="1">
          <circle cx="52.5" cy="52.5" r="52.5" stroke="none" />
          <circle cx="52.5" cy="52.5" r="52" fill="none" />
        </g>
      </svg>
        <div class="c-winddirection">${windDirections[i]}</div>
      </div>
    </div>
    `;
      html += string;
    } else {
      string = `
      <div class="c-weather__firstpage">
      <div class="c-weather-body">
        <div class="c-weather-header">Sol ${keys[i]}</div>
        <div class"c-weather-subheader>${dates[i]}</div>
        <hr />
        <div class="c-weather-high">
          <div class="c-weather-text">Hi:</div>
          <div class="c-weather-value">${mxTemps[i]} °C</div>
        </div>
        <div class="c-weather-low">
          <div class="c-weather-text">Lo:</div>
          <div class="c-weather-value">${mnTemps[i]} °C</div>
        </div>
        <div class="c-weather-average">
          <div class="c-weather-text">Av:</div>
          <div class="c-weather-value">${avTemps[i]} °C</div>
        </div>


        <svg id=${i} class="c-compass" xmlns="http://www.w3.org/2000/svg" width="105" height="105" viewBox="0 0 105 105">
        <title>Windroos</title>
        <g transform="translate(-113 -370.479)">
          <path d="M8.3,0l8.3,34.8H0Z" transform="translate(173.607 458.071) rotate(180)" fill="#fff" />
          <path d="M8.3,0l8.3,34.8H0Z" transform="translate(157 388.48)" fill="#e3dddd" />
        </g>
        <g fill="none" stroke="#fff" stroke-width="1">
          <circle cx="52.5" cy="52.5" r="52.5" stroke="none" />
          <circle cx="52.5" cy="52.5" r="52" fill="none" />
        </g>
      </svg>
        <div class="c-winddirection">${windDirections[i]}</div>
        

      </div>
      
    </div>
    `;
      html += string;
    }
  }

  document.querySelector('.c-weather').innerHTML = html;
  for (let i = 0; i < windList.length; i++) {
    let compass = document.getElementById(i);
    compass.style.webkitTransform = 'rotate(' + Math.abs(windList[i]) + 'deg)';
    compass.style.MozTransform = 'rotate(' + -Math.abs(windList[i]) + 'deg)';
    compass.style.transform = 'rotate(' + -Math.abs(windList[i]) + 'deg)';
  }
  console.info('Data loaded');
};

// function to change display
const setDisplay = function (className, displayValue) {
  let items = document.getElementsByClassName(className);
  for (let i = 0; i < items.length; i++) {
    items[i].style.display = displayValue;
  }
};

// converts Fahrentheit to celsius
const FahrenheitToCelsius = function (fahrenheit) {
  let fTemp = fahrenheit;
  let conversion = ((fTemp - 32) * 5) / 9;
  return Number(conversion.toFixed(2));
};

//get winddirection from degrees
const getDirection = function (angle) {
  let directions = ['N', 'NNW', 'NW', 'WNW', 'W', 'WSW', 'SW', 'SSW', 'S', 'SSE', 'SE', 'ESE', 'E', 'ENE', 'NE', 'NNE'];
  return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 22.5) % 16];
};

window.addEventListener('load', (event) => {
  console.info('Page fuly loaded');
  let btnPrev = document.getElementById('previous');
  let btnNext = document.getElementById('next');

  // onclick event for next button
  btnNext.addEventListener('click', function () {
    setDisplay('c-weather__secondpage', 'none');
    setDisplay('c-weather__firstpage', 'block');
    document.getElementById('elipse1').style.opacity = 0.5;
    document.getElementById('elipse2').style.opacity = 1;
    document.getElementById('previous').style.opacity = 1;
    document.getElementById('previous').style.cursor = 'pointer';
    document.getElementById('next').style.cursor = 'default';
    document.getElementById('next').style.opacity = 0;
  });

  // on click event for previous button
  btnPrev.addEventListener('click', function () {
    setDisplay('c-weather__secondpage', 'block');
    setDisplay('c-weather__firstpage', 'none');
    document.getElementById('elipse1').style.opacity = 1;
    document.getElementById('elipse2').style.opacity = 0.5;
    document.getElementById('previous').style.opacity = 0;
    document.getElementById('next').style.opacity = 1;
    document.getElementById('next').style.cursor = 'pointer';
    document.getElementById('previous').style.cursor = 'default';
  });
});

document.addEventListener('DOMContentLoaded', function () {
  console.info('JS loaded');
  fetchData();
});

import { validatIp } from './helpers';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timeZoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

function getData() {
  // data validation
  if (validatIp(ipInput.value)) {
    fetch(
      `https://geo.ipify.org/api/v2/country?apiKey=at_pUbah6gQCSS11WTILAD4wJIyZHVzL&ipAddress=${ipInput.value}`
    )
      .then((response) => response.json())
      // ...send our data in function setInfo
      // .then((data) => setInfo(data));
      .then(setInfo);
  }
}

function handleKey(e) {
  if (e.key === 'Enter') {
    getData();
  }
}

// we get object
function setInfo(mapData) {
  // console.log(mapData);
  ipInfo.innerText = mapData.ip;
  locationInfo.innerText =
    mapData.location.country + ' ' + mapData.location.region;
  timeZoneInfo.innerText = mapData.location.timezone;
  ispInfo.innerText = mapData.isp;
}

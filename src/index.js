// import styles
import 'leaflet/dist/leaflet.css';
// import library
import L from 'leaflet';
import { addTilelayer, validatIp } from './helpers';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

// for leaflet icon marker
const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
  // iconAnchor: [22, 94],
});

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timeZoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

//leaflet
const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
  zoomControl: false,
});

addTilelayer(map);

// add marker
L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

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

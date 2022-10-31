// import polyfill
import 'babel-polyfill';
// import styles
import 'leaflet/dist/leaflet.css';
// import library
import L from 'leaflet';
import { addOffset, addTilelayer, getAddress, validatIp } from './helpers';
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
    // fetch(
    //   `https://geo.ipify.org/api/v2/country,city?apiKey=at_pUbah6gQCSS11WTILAD4wJIyZHVzL&ipAddress=${ipInput.value}`
    // )
    // .then((response) => response.json())
    // ...send our data in function setInfo
    // .then((data) => setInfo(data));

    getAddress(ipInput.value).then(setInfo);
  }
}

function handleKey(e) {
  if (e.key === 'Enter') {
    getData();
  }
}

// we get object
function setInfo(mapData) {
  const { lat, lng, country, region, timezone } = mapData.location;
  // console.log(mapData);
  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = country + ' ' + region;
  timeZoneInfo.innerText = timezone;
  ispInfo.innerText = mapData.isp;

  // method from leaflet
  map.setView([lat, lng]);
  L.marker([lat, lng], { icon: markerIcon }).addTo(map);

  if (matchMedia('(max-width: 1023px)').matches) {
    addOffset(map);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getAddress('102.222.22.1').then(setInfo);
});

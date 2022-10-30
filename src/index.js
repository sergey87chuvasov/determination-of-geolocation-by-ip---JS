const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
  // data validation
  fetch(
    `https://geo.ipify.org/api/v2/country?apiKey=at_pUbah6gQCSS11WTILAD4wJIyZHVzL&ipAddress=${ipInput.value}`
  )
    .then((response) => response.json())
    .then(console.log);
}

function handleKey(e) {
  if (e.key === 'Enter') {
    getData();
  }
}

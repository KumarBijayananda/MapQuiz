//---------------------js for map start ---------------------------
//.setView([lat, log],zoom view)
var map = L.map("map").setView([0, 0], 2);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
  checkIfCorrect(e.latlng);
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
  console.log(e.latlng);
  //   var marker = L.marker(e.latlng).addTo(map);
}
map.on("click", onMapClick);

//---------------------js for map end ---------------------------

let countryList = getCountryList();
let countryCode = "";
const startButton = document.getElementById("startButton");
// const hintList=document.querySelectorAll("hint")
const hint1 = document.getElementById("hint1");
const hint2 = document.getElementById("hint2");
const hint3 = document.getElementById("hint3");

startButton.addEventListener("click", startGame);

async function startGame() {
  const countryIndex = Math.floor(Math.random() * countryList.length);
  country = countryList[countryIndex].name.common;
  countryCode = countryList[countryIndex].cca2;
  console.log("here is the country code: "+countryCode);
  countryList.splice(countryIndex, 1);

  const countryInfo = await getInfo(country);
  console.log(countryInfo[0].name.common);

  const flag = document.createElement("img");
  flag.src = countryInfo[0].flags.png;
  hint1.appendChild(flag);

  const capital = document.createElement("h4");
  capital.textContent = `Capital city: ${countryInfo[0].capital}`;
  hint1.appendChild(capital);

  const continent = document.createElement("h4");
  continent.textContent = `Continent: ${countryInfo[0].continents}`;
  hint2.appendChild(continent);

  const population = document.createElement("h4");
  population.textContent = `Population: ${countryInfo[0].population}`;
  hint2.appendChild(population);
}

// function getCountry() {
//   const setCountry = countryList[Math.floor(Math.random() * 250)].name.common;
//   //   console.log(setCountry);
//   return setCountry;
// }

async function getCountryList() {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/all?fields=name,cca2`
    );
    const data = await response.json();
    countryList = data;

    // return setCountry;
  } catch (error) {
    console.log(`Error : ${error}`);
  }
}

async function getInfo(country) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}?fullText=true`
    );
    const data = await response.json();
    console.log(data[0].name.common);
    return data;
  } catch (error) {
    console.log(`Error : ${error}`);
  }
}

async function checkIfCorrect(e) {
  console.log(`LAT: ${e.lat} and LONG: ${e.lng}`);

  try {
    const response = await fetch(
      `http://api.geonames.org/countryCodeJSON?lat=${e.lat}&lng=${e.lng}&username=kumarbijayananda`
    );
    const data = await response.json();
    console.log(data.countryName);
  } catch (error) {
    console.log("Error from checkIfCorrect:" + error);
  }
}

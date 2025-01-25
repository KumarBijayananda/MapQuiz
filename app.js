//---------------------js for map start ---------------------------
//.setView([lat, log],zoom view)
var map = L.map("map").setView([39.7837304, -100.445882], 2);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
  popup.setLatLng(e.latlng);
  //     .setContent("You clicked the map at " + e.latlng.toString())
  //     .openOn(map);
  //   console.log(e);
  var marker = L.marker(e.latlng).addTo(map);
}
map.on("click", onMapClick);

//---------------------js for map end ---------------------------
let data;
async function getInfo() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/name/india?fullText=true"
    );
    data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(`Error : ${error}`);
  }
}
getInfo();



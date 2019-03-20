const div = document.getElementById("map");
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");

//console.log("Breite=",breite,"Länge=",laenge,"Titel=",titel 

//Karte initialisieren
let karte = L.map("map");
//console.log(karte);

karte.setView(
    [breite,laenge],
    13
);

//Open Street Map einbauen
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);
let pin = L.marker(
    [breite,laenge]
).addTo(karte);


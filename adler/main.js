const div = document.getElementById("map");
const breite1 = div.getAttribute("data-lat1");
const laenge1 = div.getAttribute("data-lng1");
const titel1 = div.getAttribute("data-title1");
const breite2 = div.getAttribute("data-lat2");
const laenge2 = div.getAttribute("data-lng2");
const titel2 = div.getAttribute("data-title2");

//console.log("Breite=",breite,"Länge=",laenge,"Titel=",titel 

//Karte initialisieren
let karte = L.map("map");

const kartenLayer = {
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    geolandbasemaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>'
    }),
    stamen_relief: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>'
    }),

};
//Open Street Map einbauen

let pin1 = L.marker(
    [breite1, laenge1]
).addTo(karte)

kartenLayer.geolandbasemap.addTo(karte);

L.control.layers({
    "Open Street Map": kartenLayer.osm,
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Basemap Overlay": kartenLayer.bmapoverlay,
    "Geoland Basemap Grau": kartenLayer.bmapgrau,
    "Geoland Basemap high dpi": kartenLayer.geolandbasemaphidpi,
    "Geoland Basemap Orthophoto": kartenLayer.bmaporthofoto,
    "Geoland Basemap Legende": kartenLayer.bmapgelaende,
    "Geoland Basemap Oberflaeche": kartenLayer.bmapoberflaeche,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Relief": kartenLayer.stamen_relief,
    "Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);

//Popup zum Pin heangen
pin1.bindPopup(titel1).openPopup();

let pin2 = L.marker(
    [breite2, laenge2]
).addTo(karte);

//Popup zum Pin heangen
pin2.bindPopup(titel2).openPopup();
//for Schleife
let blickeGruppe = L.featureGroup().addTo(karte)
for (let blick of ADLERBLICKE) {
    let blickpin = L.marker(
        [blick.lat, blick.lng]
    ).addTo(blickeGruppe);

    blickpin.bindPopup(
        `<h1>Standort ${blick.standort}</h1>
                    <p>Höhe: ${blick.seehoehe}m</p>
                    <em>Kunde: ${blick.kunde}</em>`
    );
}
console.log(blickeGruppe.getBounds());
karte.fitBounds(blickeGruppe.getBounds());

karte.addControl(new L.Control.Fullscreen());
var hash = new L.Hash(karte);

var coords = new L.Control.Coordinates();

coords.addTo(karte);

karte.on('click', function (e) {
    coords.setCoordinates(e);
});


var gpx = '...'; // URL to your GPX file or the GPX itself
new L.GPX("AdlerwegEtappe11.gpx", {
        async: true,
        marker_options: {
            startIconUrl: 'https://raw.githubusercontent.com/mpetazzoni/leaflet-gpx/master/pin-icon-start.png',
            endIconUrl: 'https://raw.githubusercontent.com/mpetazzoni/leaflet-gpx/master/pin-icon-end.png',
            shadowUrl: 'https://raw.githubusercontent.com/mpetazzoni/leaflet-gpx/master/pin-shadow.png'
        }
    }).on('loaded', function (e) {
        karte.fitBounds(e.target.getBounds());
    }).on('addline', function (e) {
            console.log('linie geladen');
            const controlelevation = L.control.elevation({
                detachedView: true,
                elevationDiv: "#elevation-div",
            });
            controlelevation.addTo(karte);
controlelevation.addData(e.line);
const gpxLinie = e.line.getLatLngs();
console.log(gpxLinie);
for (let i = 1; i < gpxLinie.length; i += 1){
   let p1 = gpxLinie[i-1];
   let p2 = gpxLinie[i];
    let dist = karte.distance(
        [p1.lat,p1.lng],
        [p2.lat,p2.lng]
            );
            let delta = (p2.meta.ele - p1.meta.ele);
            let proz = (dist !=0 ? delta / dist * 100.0 : 0).toFixed(1);
            let farbe =
        proz >= 20 ? '#d73027':
        proz >= 10 ? '#fc8d59':
        proz >= 5 ? '#fee08b':
        proz >= 0 ? '#ffffbf':
        proz >= -10 ? '#d9ef8b':
        proz >= -20 ? '#d9ef8b':
         '#1a9850';
L.polyline(
    [
        [p1.lat,p1.lng],
        [p2.lat,p2.lng]
    ], {
        color : farbe,
    }
).addTo(karte);
}

           
        });
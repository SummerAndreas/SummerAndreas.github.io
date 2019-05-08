const div = document.getElementById("map");
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");

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

karte.setView(
    [breite, laenge],
    12
);

kartenLayer.geolandbasemap.addTo(karte);

const layerControl = L.control.layers({
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

var coords = new L.Control.Coordinates();

coords.addTo(karte);

karte.on('click', function (e) {
    coords.setCoordinates(e);
});
//console.log (AWS);



const awsTirol = L.featureGroup();
async function loadStations() {
    const response = await fetch("https://aws.openweb.cc/stations");
    const stations = await response.json();

    L.geoJson(stations)
        .bindPopup(function (layer) {
            //console.log("Layer", layer);
            const date = new Date(layer.feature.properties.date)
            console.log("Datum: ", date);
            return `<h4>${layer.feature.properties.name} </h4>
    Seehöhe: ${layer.feature.geometry.coordinates[2]} m<br>
    Temperatur: ${layer.feature.properties.LT} °C<br>
    Schneehöhe: ${layer.feature.properties.HS} cm <br>
    Datum: ${date.toLocaleDateString("de-AT")}
    ${date.toLocaleTimeString("de-AT")} <br>
    Windgeschwindigkeit: ${layer.feature.properties.WG ? layer.feature.properties.WG + ' km/h': 'keine Daten'} 
   <hr>
   <footer> Quelle: Land Tirol - <a href="https://data.tirol.gv.at">data.tirol.gv.at</a> </footer>
   `;
        })
        .addTo(awsTirol);

    karte.fitBounds(awsTirol.getBounds());
    layerControl.addOverlay(awsTirol, "Wetterstationen Tirol");
    //Windrichtung anzueigen
    const windlayer = L.featureGroup();
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.WR) {
                let color = 'black';
                if (feature.properties.WG > 20) {
                    color = 'red';
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<i style ="color: ${color}; "transform: rotate(${feature.properties.WR}deg)" class="fas fa-arrow-circle-up fa-2x"></i>`
                    })

                });
            }
        }
    }).addTo(windlayer);
    layerControl.addOverlay(windlayer, "Windrichtung");
    //windlayer.addTo(karte)

    //temperatur anzeigen
    const temperaturlayer = L.featureGroup();
    const farbPalette = [
        [-10, "blue"],
        [0, "yellow"],
        [10, "orange"],
        [20, "red"],
    ];
    L.geoJson(stations, {
            pointToLayer: function (feature, latlng) {
                if (feature.properties.LT) {
                    let color = 'red';
                    for (let i=0; i<farbPalette.length; i++) {
                        console.log(farbPalette[i],feature.properties.LT);
                        if (feature.properties.LT < farbPalette[i][0]) {
                            color = farbPalette[i][1];
                            break;
                        }
                    }
                    //let color = 'blue';
                    // if (feature.properties.LT > 0) {
                    //     color = 'red';
                    //}
                    return L.marker(latlng, {
                        icon: L.divIcon({
                            html: `<div class="temperaturLabel" style="background-color:${color}">${feature.properties.LT }</div>`
                        })

                    });
                }
            }
        })
        .addTo(temperaturlayer);
    layerControl.addOverlay(temperaturlayer, "Temperatur");
    temperaturlayer.addTo(karte);
}
loadStations();
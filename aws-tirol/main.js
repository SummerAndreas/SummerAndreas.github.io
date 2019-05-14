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
    let farbpalette_wind = [
        [3, "#00b900"],
        [4, "#10cd24"],
        [5, "#72d475"],
        [6, "#fed6d3"],
        [7, "#ffb6b3"],
        [8, "#ff9e9a"],
        [9, "#ff8281"],
        [10, "#ff6160"],
        [11, "#ff453c"],
        [12, "#ff200e"]
    ];

    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.WR) {

                for (let i = 0; i < farbpalette_wind.length; i++) {
                    const windspeed_bf = Math.round(Math.pow(((feature.properties.WG / 3.6) / 0.836), (2 / 3)));
                    //Umrechnen von beauford -> km/h (gesehen bei elleluk)
                    if (windspeed_bf < farbpalette_wind[i][0]) {
                        color = farbpalette_wind[i][1];
                        break;
                    }
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<i style="color: ${color}; transform: rotate(${feature.properties.WR-45}deg)" class="fas fa-arrow-circle-up fa-2x"></i>`
                    })

                });

            }
        }

    }).addTo(windlayer);
    layerControl.addOverlay(windlayer, "Windrichtung");


    //Temperatur anzeigen & einfärben
    const temperaturlayer = L.featureGroup();
    const farbPalette = [
        [-28, "#646664"],
        [-26, "#8c8a8c"],
        [-24, "#b4b2b4"],
        [-22, "#cccecc"],
        [-20, "#e4e6e4"],
        [-18, "#772d76"],
        [-16, "#b123b0"],
        [-14, "#d219d1"],
        [-12, "#f0f"],
        [-10, "#ff94ff"],
        [-8, "#3800d1"],
        [-6, "#325afe"],
        [-4, "#2695ff"],
        [-2, "#00cdff"],
        [0, "#00fffe"],
        [2, "#007800"],
        [4, "#009d00"],
        [6, "#00bc02"],
        [8, "#00e200"],
        [10, "#0f0"],
        [12, "#fcff00"],
        [14, "#fdf200"],
        [16, "#fde100"],
        [18, "#ffd100"],
        [20, "#ffbd00"],
        [22, "#ffad00"],
        [24, "#ff9c00"],
        [26, "#ff7800"],
        [28, "red"],
        [30, "#f30102"],
        [32, "#d20000"],
        [34, "#c10000"],
        [36, "#b10000"],
        [38, "#a10000"],
        [40, "#900000"],
        [42, "#770100"],
        [44, "#5f0100"],
        [46, "#460101"],
        [48, "#2e0203"],

    ];
    L.geoJson(stations, {
            pointToLayer: function (feature, latlng) {
                if (feature.properties.LT) {

                    for (let i = 0; i < farbPalette.length; i++) {
                        console.log(farbPalette[i], feature.properties.LT);
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
    // Luftfeuchtigkeit
    const humidityLayer = L.featureGroup();
    let farbpalette_humidity = [
        [30, "#EEE"],
        [40, "#DDD"],
        [50, "#C6C9CE"],
        [60, "#BBB"],
        [70, "#AAC"],
        [80, "#9998DD"],
        [90, "#8788EE"],
        [100, "#7677E1"]

    ];

    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            let color;
            if (feature.properties.RH) {
                for (let i = 0; i < farbpalette_humidity.length; i++) {
                    console.log(farbpalette_humidity[i], feature.properties.RH);
                    if (feature.properties.RH < farbpalette_humidity[i][0]) {
                        color = farbpalette_humidity[i][1];
                        break;
                    }
                }

                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="humidityLabel" style="background-color:${color}"> ${feature.properties.RH} </div>`
                    })

                });

            }
        }
    }).addTo(humidityLayer);
    layerControl.addOverlay(humidityLayer, "Relative Luftfeuchte");
    //Schneehöhen (mit eigener Farbgebung)
    const snowLayer = L.featureGroup();
    const farbPalette_snow = [
        [5, "#646664"],
        [10, "#8c8a8c"],
        [25, "#b4b2b4"],
        [50, "#cccecc"],
        [75, "#e4e6e4"],
        [125, "#3800d1"],
        [200, "#325afe"],
        [300, "#2695ff"],
        [400, "#00cdff"],
        [800, "#00fffe"],
    ]
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.HS) {
                if (feature.properties.HS >= 0) {
                    for (let i = 0; i < farbPalette_snow.length; i++) {

                        if (feature.properties.HS < farbPalette_snow[i][0]) {
                            color = farbPalette_snow[i][1];
                            break;
                        }
                    }



                    return L.marker(latlng, {
                        icon: L.divIcon({
                            html: `<div class="snowLabel" style= "background-color: ${color}"> ${feature.properties.HS}</div>`
                        })

                    });
                }
            }
        }
    }).addTo(snowLayer);
    layerControl.addOverlay(snowLayer, "Schneehöhe")

}

loadStations();
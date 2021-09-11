// map initialization
const map = L.map('map').setView([-7.7956,110.3695], 10);

// ========================
// TILE LAYER
// ========================

// osm layer
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);

// terrain layer
var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Esri World Imagery Layer
var worldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Google Street Imagery
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

// WMS
var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true,
    attribution: "Weather data © 2012 IEM Nexrad"
});

// ========================
// MARKER
// ========================


// Marker
var myIcon = L.icon({
    iconUrl: '/icon/red_pin.png',
    iconSize: [50,50],

});
const firstMarker = L.marker([-7.7956,110.3695], {
    icon:myIcon, 
    draggable: true,
    opacity: 10.0
});
// Popup
const popup = firstMarker.bindPopup('You re.' + firstMarker.getLatLng())
.openPopup();

// ========================
// GEOJSON
// ========================

var pointGeojson = new L.geoJson.ajax('/data/point.geojson');
var lineGeojson = new L.geoJson.ajax('/data/line.geojson');
var polygonGeojson = new L.geoJson.ajax('/data/polygon.geojson');


// ========================
// LAYER CONTROL
// ========================
var baseMaps = {
    'OSM': osm,
    'Terrain': openTopoMap,
    'World Imagery': worldImagery,
    'Google Street': googleStreets,
    
};

var overlayMaps = {
    'FirstMarker': firstMarker,
    'Point GeoJSON': pointGeojson,
    'Line GeoJSON' : lineGeojson,
    'Polygon GeoJSON': polygonGeojson,
    'Weather': nexrad,
};

L.control.layers(baseMaps, overlayMaps,{
    collapsed: false
}).addTo(map);


// ========================
// LEAFLET EVENTS
// ========================
map.on('mouseover', function (){
    console.log('Your mouse over here')
});

map.on('mousemove', function (e) {
    document.getElementsByClassName('coordinate')[0].innerHTML = 'lat: ' + e.latlng.lat + 'lng: ' + e.latlng.lng;
    // console.log('lat: ' + e.latlng.lat, 'lng: ' + e.latlng.lng)
})

// ========================
// STYLE CUSTOMIZATION
// ========================

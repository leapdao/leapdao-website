// center of the map
var center = [20, 0];

// Create the map
var map = L.map('map').setView(center, 2);
map.scrollWheelZoom.disable();

// Set up the OSM layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
  maxZoom: 18
}).addTo(map);

var sunify = 'https://avatars3.githubusercontent.com/u/1477583';
var helge = 'https://avatars3.githubusercontent.com/u/754426';
var zobro = 'https://avatars2.githubusercontent.com/u/61939';
var anton = 'https://avatars1.githubusercontent.com/u/1623033';
var jan = 'https://avatars2.githubusercontent.com/u/41610198';
var evgeni = 'https://avatars3.githubusercontent.com/u/28968492';
var kosta = 'https://avatars2.githubusercontent.com/u/163447';
var johann = 'https://avatars1.githubusercontent.com/u/659301';

var imageBounds = function(arr) {
  return [[arr[0] - 2.5, arr[1] - 5], [arr[0] + 2.5, arr[1] + 5]];
};
var berlin = [52.504043, 13.393236];
var grandRap = [42.9632, -85.6679];
var bratsk = [56.16667, 101.61667];
var moscow = [55.75583, 37.61778];
var ljubljana = [46.05, 14.51667];
var prague = [50.08861, 14.42139];
var seva = [44.6054, 33.5221];
var pet = [52.38333, 8.96667];

L.imageOverlay(sunify, imageBounds(bratsk)).addTo(map);
L.imageOverlay(zobro, imageBounds(grandRap)).addTo(map);
L.imageOverlay(anton, imageBounds(moscow)).addTo(map);
L.imageOverlay(kosta, imageBounds(seva)).addTo(map);
L.imageOverlay(johann, imageBounds(pet)).addTo(map);
L.imageOverlay(helge, imageBounds(berlin)).addTo(map);
L.imageOverlay(evgeni, imageBounds(prague)).addTo(map);
L.imageOverlay(jan, imageBounds(ljubljana)).addTo(map);

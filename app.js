// ----- Constants -----
const PHYS = {
  density: {iron: 7800, rock: 3300, ice: 1000},
  gravity: 9.81
};

let map;
let meteorMarker = null;
let blastLayers = [];

// ----- Initialize Map -----
function initMap() {
  map = L.map('map').setView([20, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  map.on('click', e => placeMeteor(e.latlng.lat, e.latlng.lng));
}

// ----- Place Meteor Marker -----
function placeMeteor(lat, lng) {
  if (meteorMarker) map.removeLayer(meteorMarker);
  meteorMarker = L.marker([lat, lng]).addTo(map);
  document.getElementById('lat').value = lat.toFixed(5);
  document.getElementById('lng').value = lng.toFixed(5);
}

// ----- Simulation -----
function runSimulation() {
  clearBlasts();

  const lat = parseFloat(document.getElementById('lat').value);
  const lng = parseFloat(document.getElementById('lng').value);
  const diameter = parseFloat(document.getElementById('diameter').value);
  const speed = parseFloat(document.getElementById('speed').value);
  const material = document.getElementById('material').value;

  // Basic energy calculation (simplified)
  const radius = diameter / 2;
  const volume = (4/3) * Math.PI * Math.pow(radius,3);
  const mass = volume * PHYS.density[material];
  const kineticEnergy = 0.5 * mass * speed**2; // Joules

  const blastRadius = Math.cbrt(kineticEnergy/1e12)*1000; // simplified radius in meters

  drawBlast(lat, lng, blastRadius, {color:'red', fillOpacity:0.3});
}

// ----- Draw Blast Circle -----
function drawBlast(lat, lng, radius_m, options) {
  const circle = L.circle([lat, lng], {
    radius: radius_m,
    color: options.color,
    fillOpacity: options.fillOpacity
  }).addTo(map);
  blastLayers.push(circle);
}

// ----- Clear Blasts -----
function clearBlasts() {
  blastLayers.forEach(l => map.removeLayer(l));
  blastLayers = [];
}

// ----- Reset -----
function resetSimulation() {
  clearBlasts();
  if (meteorMarker) map.removeLayer(meteorMarker);
  meteorMarker = null;
}

// ----- Bind Buttons -----
document.getElementById('runBtn').onclick = runSimulation;
document.getElementById('resetBtn').onclick = resetSimulation;

// ----- Start -----
initMap();

import { getDrawnMeteorShape } from './drawing.js';
import { kineticEnergy, tntEquivalent, meteorMass, polygonArea, dragForce } from './utils.js';

let animationId;
let meteor = null;

export function runSimulation() {
  if (!meteor) initMeteor();
  animationId = requestAnimationFrame(simStep);
}

export function pauseSimulation() {
  cancelAnimationFrame(animationId);
}

export function stepSimulation() {
  if (!meteor) initMeteor();
  simStep();
}

export function resetSimulation() {
  cancelAnimationFrame(animationId);
  meteor = null;
  let canvas = document.getElementById('simulationCanvas');
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function takeSnapshot() {
  let canvas = document.getElementById('simulationCanvas');
  let img = canvas.toDataURL("image/png");
  let link = document.createElement('a');
  link.href = img;
  link.download = "snapshot.png";
  link.click();
}

export function exportJSON() {
  if (!meteor) return;
  let data = {
    parameters: meteor,
    trajectory: meteor.trajectory
  };
  let blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  let url = URL.createObjectURL(blob);
  let link = document.createElement('a');
  link.href = url;
  link.download = "simulation.json";
  link.click();
}

function initMeteor() {
  let shape = getDrawnMeteorShape();
  let area = polygonArea(shape);
  let volume = area * (area ** 0.5); // rough approximation
  meteor = {
    shape, volume, density: 3300, velocity: 15000, mass: meteorMass(volume, 3300),
    x: 400, y: 0, trajectory: []
  };
}

function simStep() {
  if (!meteor) return;
  let canvas = document.getElementById('simulationCanvas');
  let ctx = canvas.getContext('2d');

  // Physics
  meteor.y += meteor.velocity * 0.01;
  meteor.trajectory.push({ x: meteor.x, y: meteor.y });

  // Draw
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawEarth(ctx);
  drawMeteor(ctx);
  drawTrail(ctx);

  if (meteor.y < canvas.height) {
    animationId = requestAnimationFrame(simStep);
  }
}

function drawEarth(ctx) {
  ctx.beginPath();
  ctx.arc(400, 600, 300, 0, Math.PI, true);
  ctx.fillStyle = '#228B22'; // land
  ctx.fill();
}

function drawMeteor(ctx) {
  ctx.beginPath();
  ctx.arc(meteor.x, meteor.y, 5, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
}

function drawTrail(ctx) {
  ctx.beginPath();
  ctx.moveTo(meteor.trajectory[0].x, meteor.trajectory[0].y);
  meteor.trajectory.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = 'orange';
  ctx.stroke();
}

// drawing.js
let vertices = [];
let drawingCanvas, ctx;
let isDrawing = false;

// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  drawingCanvas = document.getElementById('drawingCanvas');
  if (!drawingCanvas) {
    console.error("Drawing canvas not found!");
    return;
  }
  ctx = drawingCanvas.getContext('2d');

  // Mouse events for drawing
  drawingCanvas.addEventListener('mousedown', startDrawing);
  drawingCanvas.addEventListener('mousemove', draw);
  drawingCanvas.addEventListener('mouseup', stopDrawing);
  drawingCanvas.addEventListener('mouseleave', stopDrawing);
});

// Start drawing when mouse pressed
function startDrawing(e) {
  isDrawing = true;
  vertices.push({ x: e.offsetX, y: e.offsetY });
}

// Draw while mouse moves
function draw(e) {
  if (!isDrawing) return;
  vertices.push({ x: e.offsetX, y: e.offsetY });
  redraw();
}

// Stop drawing
function stopDrawing() {
  isDrawing = false;
}

// Redraw polygon
function redraw() {
  if (!ctx) return;
  ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
  if (vertices.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(vertices[0].x, vertices[0].y);
  vertices.forEach(v => ctx.lineTo(v.x, v.y));
  ctx.strokeStyle = 'lime';
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Reset drawing
export function resetDrawing() {
  vertices = [];
  if (ctx) ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
}

// Get drawn meteor shape
export function getDrawnMeteorShape() {
  return vertices;
}


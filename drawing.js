let vertices = [];
let drawingCanvas = document.getElementById('drawingCanvas');
let ctx = drawingCanvas.getContext('2d');

drawingCanvas.addEventListener('mousedown', startDrawing);
drawingCanvas.addEventListener('mousemove', draw);
drawingCanvas.addEventListener('mouseup', stopDrawing);

let isDrawing = false;

function startDrawing(e) {
  isDrawing = true;
  vertices.push({ x: e.offsetX, y: e.offsetY });
}

function draw(e) {
  if (!isDrawing) return;
  vertices.push({ x: e.offsetX, y: e.offsetY });
  redraw();
}

function stopDrawing() {
  isDrawing = false;
}

function redraw() {
  ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
  if (vertices.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(vertices[0].x, vertices[0].y);
  vertices.forEach(v => ctx.lineTo(v.x, v.y));
  ctx.strokeStyle = 'lime';
  ctx.lineWidth = 2;
  ctx.stroke();
}

export function getDrawnMeteorShape() {
  return vertices;
}

export function resetDrawing() {
  vertices = [];
  ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
}

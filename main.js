const circles = [
  { color: [0, 255, 175], radius: 80, x: 271, y: 260, dir: 1 },
  { color: [0, 255, 175], radius: 140, x: 196, y: 230, dir: 1 },
  { color: [0, 255, 175], radius: 100, x: 216, y: 170, dir: -1 },
  { color: [0, 175, 255], radius: 120, x: 226, y: 260, dir: 1 },
  { color: [0, 175, 255], radius: 60, x: 286, y: 220, dir: -1 }
];

const svgCircles = Array.from(document.querySelectorAll('circle'));
const check = document.getElementById('check');
const svgRoot = document.getElementById('amoebe');

const speed = 1.4;

circles.forEach((circle, i) => {
  const svgCircle = svgCircles[i];
  svgCircle.setAttribute('cx', circle.x);
  svgCircle.setAttribute('cy', circle.y);
  svgCircle.setAttribute('r', circle.radius);
  svgCircle.setAttribute(
    'fill',
    `rgb(${circle.color.map(Math.round).join(',')})`
  );
});

function draw(t) {
  circles.forEach((circle, i) => {
    const x =
      (Math.cos(((t / 50) * speed) / circle.radius) *
        circle.radius *
        circle.dir) /
      3;
    const y =
      (Math.sin(((t / 53) * speed) / circle.radius) *
        circle.radius *
        circle.dir) /
      3;
    svgCircles[i].setAttribute('transform', `translate(${x} ${y})`);
  });
}
const fps = 30;
const interval = 1000 / fps;
let then = Date.now();

function runDraw() {
  requestAnimationFrame(runDraw);

  const now = Date.now();
  const delta = now - then;

  if (delta > interval) {
    then = now - (delta % interval);
    draw(now);
  }
}

runDraw();

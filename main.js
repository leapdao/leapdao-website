const circles = [
  { color: [0, 255, 170], radius: 120, x: 231, y: 220, dir: 1 },
  { color: [0, 255, 170], radius: 120, x: 236, y: 230, dir: 1 },
  { color: [0, 255, 170], radius: 120, x: 256, y: 250, dir: -1 },
  { color: [255, 255, 0], radius: 120, x: 226, y: 260, dir: 1 },
  { color: [255, 255, 0], radius: 120, x: 290, y: 330, dir: 1 }
];

const svgCircles = Array.from(document.querySelectorAll('circle'));
const check = document.getElementById('check');
const svgRoot = document.getElementById('amoebe');

const speed = 1.1;

circles.forEach((circle, i) => {
  const svgCircle = svgCircles[i];
  svgCircle.setAttribute('cx', circle.x);
  svgCircle.setAttribute('cy', circle.y);
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
      (Math.sin(((t / 50) * speed) / circle.radius) *
        circle.radius *
        circle.dir) /
      3;
    svgCircles[i].setAttribute('transform', `translate(${x} ${y})`);
    const rFn = i % 2 ? Math.cos : Math.sin;
    svgCircles[i].setAttribute('r', circle.radius + rFn((t / 500) * speed) * 5);
  });
}

const runWithFps = (fn, fps) => {
  const interval = 1000 / fps;
  let then = Date.now();
  let stopped = false;

  const run = () => {
    requestAnimationFrame(run);

    const now = Date.now();
    const delta = now - then;

    if (delta > interval && !stopped) {
      then = now - (delta % interval);
      fn(now);
    }
  };

  run();

  return () => {
    stopped = true;
  };
};

runWithFps(draw, 30);

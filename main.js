(function() {
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
      svgCircles[i].setAttribute(
        'r',
        circle.radius + rFn((t / 500) * speed) * 5
      );
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
})();

(function() {
  function buildRequestUrl(form) {
    const action = form.getAttribute('action');
    const formData = new FormData(form);
    const url = Array.from(formData.entries()).reduce(
      (memo, [key, value]) => `${memo}&${key}=${encodeURIComponent(value)}`,
      action
    );
    return `${url}&_=${Date.now()}`;
  }

  function register2(form) {
    const alertEl = form.querySelector('.alert');
    const emailEl = form.querySelector('.email');
    const submitEl = form.querySelector('.submit');

    // jsonp
    const callbackName = `antiJQuery_${Date.now()}`;
    const url = `${buildRequestUrl(form)}&c=${callbackName}`;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);

    alertEl.innerText = 'Subscribing...';
    emailEl.setAttribute('disabled', true);
    submitEl.setAttribute('disabled', true);

    // callback for jsonp
    window[callbackName] = result => {
      try {
        if (result.result !== 'success') {
          alertEl.innerHTML = result.msg;
          emailEl.removeAttribute('disabled');
          submitEl.removeAttribute('disabled');
          emailEl.style.display = 'block';
          submitEl.style.display = 'block';
        } else {
          alertEl.innerHTML = 'Thank you!';
        }
      } catch (err) {
        alertEl.innerHTML = 'Ops, there was an error.';
        emailEl.removeAttribute('disabled');
        submitEl.removeAttribute('disabled');
      }

      // cleaning up
      document.head.removeChild(script);
      window[callbackName] = undefined;
    };
  }

  const subscribeForm = document.getElementById('mc-embedded-subscribe-form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', e => {
      e.preventDefault();
      register2(e.target);
    });
  }
})();

(function() {
  const circles = [
    { color: [42, 255, 134], radius: 120, x: 231, y: 220, dir: 1 },
    { color: [42, 255, 134], radius: 120, x: 236, y: 230, dir: 1 },
    { color: [42, 255, 134], radius: 120, x: 256, y: 250, dir: -1 },
    { color: [255, 255, 0], radius: 120, x: 226, y: 260, dir: 1 },
    { color: [255, 255, 0], radius: 120, x: 290, y: 330, dir: 1 }
  ];

  const svgRoot = document.getElementById("amoebe");
  const svgCircles = Array.from(svgRoot.querySelectorAll("circle"));

  const speed = 1.1;

  circles.forEach((circle, i) => {
    const svgCircle = svgCircles[i];
    svgCircle.setAttribute('cx', circle.x);
    svgCircle.setAttribute('cy', circle.y);
    svgCircle.setAttribute(
      "fill",
      `rgb(${circle.color.map(Math.round).join(",")})`
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
      svgCircles[i].setAttribute("transform", `translate(${x} ${y})`);
      const rFn = i % 2 ? Math.cos : Math.sin;
      svgCircles[i].setAttribute(
        "r",
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

  const fetchContributors = () => {
    const organizationRepositories = [];
    fetch("https://api.github.com/orgs/leapdao/repos")
      .then(response => response.json())
      .then(repos => {
        repos.map((repo, index) => {
          fetch(`${repo.contributors_url}`)
            .then(response => response.json())
            .then(repositories => {
              organizationRepositories.push(repositories);
              const contributors = organizationRepositories.reduce(
                (previousValue, currentValue) => {
                  return previousValue + currentValue.length;
                },
                0
              );
              document.getElementById("contributors").innerHTML =
                "<strong>" + contributors + "</strong> contributors";
            });
        });
      });
  };

  const fetchMembers = () => {
    fetch(`https://nplrpwwfw1.execute-api.eu-west-1.amazonaws.com/prod/slack`)
      .then(response => response.json())
      .then(data => {
        document.getElementById("members").innerHTML =
          "<strong>" + data + "</strong> members";
      });
  };

  const fetchUTXO = () => {
    const url = window.location.pathname.split(".")[0];
    if (url === "test") {
      fetch("./mocks/testnet.json")
        .then(response => response.json())
        .then(
          data => (document.getElementById("utxos").innerHTML = `~${data.data}`)
        );
    } else {
      fetch("./mocks/mainnet.json")
        .then(response => response.json())
        .then(
          data => (document.getElementById("utxos").innerHTML = `~${data.data}`)
        );
    }
  };

  runWithFps(draw, 30);
  fetchContributors();
  fetchMembers();
  fetchUTXO();
})();

(function() {
  function buildRequestUrl(form) {
    const action = form.getAttribute("action");
    const formData = new FormData(form);
    const url = Array.from(formData.entries()).reduce(
      (memo, [key, value]) => `${memo}&${key}=${encodeURIComponent(value)}`,
      action
    );
    return `${url}&_=${Date.now()}`;
  }

  function register2(form) {
    const alertEl = form.querySelector(".alert");
    const emailEl = form.querySelector(".email");
    const submitEl = form.querySelector(".submit");

    // jsonp
    const callbackName = `antiJQuery_${Date.now()}`;
    const url = `${buildRequestUrl(form)}&c=${callbackName}`;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.head.appendChild(script);

    alertEl.innerText = "Subscribing...";
    emailEl.setAttribute("disabled", true);
    submitEl.setAttribute("disabled", true);

    // callback for jsonp
    window[callbackName] = result => {
      try {
        if (result.result !== "success") {
          alertEl.innerHTML = result.msg;
          emailEl.removeAttribute("disabled");
          submitEl.removeAttribute("disabled");
          emailEl.style.display = "block";
          submitEl.style.display = "block";
        } else {
          alertEl.innerHTML = "Thank you!";
        }
      } catch (err) {
        alertEl.innerHTML = "Ops, there was an error.";
        emailEl.removeAttribute("disabled");
        submitEl.removeAttribute("disabled");
      }

      // cleaning up
      document.head.removeChild(script);
      window[callbackName] = undefined;
    };
  }

  const subscribeForm = document.getElementById("mc-embedded-subscribe-form");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", e => {
      e.preventDefault();
      register2(e.target);
    });
  }

  if (window.onpopstate === null) {
    const loader = document.querySelector(".loader");
    // browser supports onpopstate
    function loadPage(pathname) {
      loader.style.display = "block";
      const xhr = new XMLHttpRequest();
      xhr.open("get", pathname);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE) {
          const html = xhr.responseText;
          const dom = new DOMParser().parseFromString(html, "text/html");
          const targetPage = document.querySelector(".page");
          const sourcePage = dom.querySelector(".page");
          targetPage.innerHTML = sourcePage.innerHTML;
          targetPage.setAttribute("class", sourcePage.getAttribute("class"));
          document.querySelector("title").innerHTML = dom.querySelector(
            "title"
          ).innerHTML;
          const scripts = Array.from(sourcePage.querySelectorAll("script"))
            .filter(s => !s.src)
            .map(s => s.innerHTML);
          if (scripts) {
            const scriptTag = document.createElement("script");
            scriptTag.innerHTML = scripts.join(";\n");
            targetPage.appendChild(scriptTag);
          }
          window.scrollTo(0, 0);

          Array.from(
            document.querySelectorAll("head script.page-script")
          ).forEach(el => {
            document.head.removeChild(el);
          });
          Array.from(dom.querySelectorAll(".page script")).forEach(
            oldScript => {
              const script = document.createElement("script");
              script.src = oldScript.src;
              script.className = "page-script";
              script.async = false;
              document.head.appendChild(script);
            }
          );

          loader.style.display = "none";
        }
      };
      xhr.send();
    }
    document.addEventListener("click", e => {
      if (
        e.target.tagName === "A" &&
        e.target.getAttribute("href").startsWith("/") &&
        e.which === 1 &&
        !e.metaKey
      ) {
        e.preventDefault();
        loadPage(e.target.getAttribute("href"));
        window.history.pushState(null, null, e.target.getAttribute("href"));
      }
    });
    window.addEventListener("popstate", e => {
      loadPage(window.location.pathname);
    });
  }
})();

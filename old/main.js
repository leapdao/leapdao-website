(function() {
  const fetchContributors = () => {
    fetch('https://api.github.com/orgs/leapdao/repos')
      .then(response => response.json())
      .then(repos =>
        Promise.all(
          repos
            .filter(r => !r.fork)
            .map(repo =>
              fetch(repo.contributors_url).then(response => response.json())
            )
        )
      )
      .then(
        reposContributors =>
          new Set(
            reposContributors.reduce(
              (allContributors, contributors) =>
                allContributors.concat(contributors.map(c => c.login)),
              []
            )
          )
      )
      .then(allContributors => {
        const contributors = document.getElementById('contributors');
        if (contributors) {
          contributors.innerHTML = allContributors.size;
        }
      });
  };

  const fetchMembers = () => {
    fetch(`https://nplrpwwfw1.execute-api.eu-west-1.amazonaws.com/prod/slack`)
      .then(response => response.json())
      .then(data => {
        const members = document.getElementById('members');
        if (members) {
          members.innerHTML = data;
        }
      });
  };

  const fetchUTXO = () => {
    const url = window.location.pathname.split('.')[0];
    if (url === 'test') {
      fetch('./mocks/testnet.json')
        .then(response => response.json())
        .then(
          data => (document.getElementById('utxos').innerHTML = `~${data.data}`)
        );
    } else {
      fetch('./mocks/mainnet.json')
        .then(response => response.json())
        .then(
          data => (document.getElementById('utxos').innerHTML = `~${data.data}`)
        );
    }
  };

  fetchContributors();
  fetchMembers();
  //fetchUTXO();
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

  // COMMENTED OUT BECAUSE INTRODUCE BUG #85: Scripts are not running on navigation
  // if (window.onpopstate === null) {
  //   const loader = document.querySelector('.loader');
  //   // browser supports onpopstate
  //   function loadPage(pathname) {
  //     loader.style.display = 'block';
  //     const xhr = new XMLHttpRequest();
  //     xhr.open('get', pathname);
  //     xhr.onreadystatechange = () => {
  //       if (xhr.readyState === xhr.DONE) {
  //         const html = xhr.responseText;
  //         const dom = new DOMParser().parseFromString(html, 'text/html');
  //         const targetPage = document.querySelector('.page');
  //         const sourcePage = dom.querySelector('.page');
  //         targetPage.innerHTML = sourcePage.innerHTML;
  //         targetPage.setAttribute('class', sourcePage.getAttribute('class'));
  //         document.querySelector('title').innerHTML = dom.querySelector(
  //           'title'
  //         ).innerHTML;
  //         const scripts = Array.from(sourcePage.querySelectorAll('script'))
  //           .filter(s => !s.src)
  //           .map(s => s.innerHTML);
  //         if (scripts) {
  //           const scriptTag = document.createElement('script');
  //           scriptTag.innerHTML = scripts.join(';\n');
  //           targetPage.appendChild(scriptTag);
  //         }
  //         window.scrollTo(0, 0);
  //
  //         Array.from(
  //           document.querySelectorAll('head script.page-script')
  //         ).forEach(el => {
  //           document.head.removeChild(el);
  //         });
  //         Array.from(dom.querySelectorAll('.page script')).forEach(
  //           oldScript => {
  //             const script = document.createElement('script');
  //             script.src = oldScript.src;
  //             script.className = 'page-script';
  //             script.async = false;
  //             document.head.appendChild(script);
  //           }
  //         );
  //
  //         loader.style.display = 'none';
  //       }
  //     };
  //     xhr.send();
  //   }
  //   document.addEventListener('click', e => {
  //     if (
  //       e.target.tagName === 'A' &&
  //       e.target.getAttribute('href').startsWith('/') &&
  //       e.which === 1 &&
  //       !e.metaKey
  //     ) {
  //       e.preventDefault();
  //       loadPage(e.target.getAttribute('href'));
  //       window.history.pushState(null, null, e.target.getAttribute('href'));
  //     }
  //   });
  //   window.addEventListener('popstate', e => {
  //     loadPage(window.location.pathname);
  //   });
  // }
})();

const amoebeCanvas = document.getElementById('amoebe');
if (amoebeCanvas) {
  const faviconCanvas = document.createElement('canvas');
  faviconCanvas.width = 32;
  faviconCanvas.height = 32;
  faviconCtx = faviconCanvas.getContext('2d');
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/png';
  document.head.appendChild(favicon);

  setInterval(() => {
    faviconCanvas.width = faviconCanvas.width;
    faviconCtx.drawImage(
      amoebeCanvas,
      0,
      0,
      amoebeCanvas.width,
      amoebeCanvas.height,
      0,
      0,
      32,
      32
    );
    favicon.href = faviconCanvas.toDataURL('image/png');
  }, 100);
}

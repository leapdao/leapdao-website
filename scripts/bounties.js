(function() {

  var limit = 5;
  var amount = 0;
  const urgentOnly = false;
  const useAuth = false;
  const token = '';  // github token in case of useAuth = true
  const cacheTTL = 900000;  // 15 minutes
  const bountiesHolder = document.getElementById('bounties');
  const bountiesOverlayHolder = document.getElementById('bounties-overlay');
  const bountiesOverlayContent = document.getElementById('bounties-overlay-content');
  const bountiesOverlayClose = document.getElementById('bounties-overlay-close');
  const orderkey = document.getElementById('orderkey');
  const orderdir = document.getElementById('orderdir');
  const filternew = document.getElementById('filternew');
  const bountySizesHolder = document.getElementById('bounty-sizes');
  // const untilHolder = document.getElementById('until');
  const originalReposUrl = 'https://api.github.com/repos/leapdao/';
  const reposUrl = 'https://r4g94d22ff.execute-api.eu-west-1.amazonaws.com/prod/';
  const repos = [
    'bridge-ui',
    'burner-wallet',
    'exit-market-maker',
    'integration-tests',
    'leapdao-docs',
    'leapdao-general-circle',
    'leapdao-website',
    'leap-node',
    'leap-core',
    'leap-contracts',
    'leap-guardian',
    'leap-sniper-rifle',
    'leap-token-faucet',
    'leap_tx_store',
    'merkle-mine-client',
    'meta',
    'network-governance',
    'project-alice',
    'solEVM-enforcer',
    'spending-conditions'
  ];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const sizeTitles = {
    'XS': '~3 hours, 200 DAI',
    'S': '~5 hours, 350 DAI',
    'M': '~8 hours, 550 DAI',
    'L': '~13 hours, 900 DAI',
    'XL': '~21 hours, 1400 DAI'
  };
  
  const md = window.markdownit({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  });
  
  
  // fetch all issues and process them
  const fetchAllIssues = (repos, urgent, limit, useAuth, order) =>
    Promise.all(repos.map(fetchIssues(urgent, useAuth)))
      // flatten results - flat array method has poor support
      .then(data => [].concat(...data))
      .then(parseIssues)
      .then(filterIssues)
      .then(sortIssues(order))
      .then(limitIssues(limit))
      .then(printIssues)
      .catch(err => {
        console.log(err);
        bountiesHolder.innerHTML = 'Error occurred while fetching bounties.';
      });
  
  
  // set auth header if needed
  const setHeaders = useAuth => {
    return useAuth ? {'Authorization': `token ${token}`} : {};
  };
  
  
  // fetch single repo live and cache it
  const fetchRepo = (urgent, useAuth, repo) =>
    fetch(`${reposUrl}${repo}/issues?labels=bounty` + (urgent ? ',urgent' : ''), {
      headers: setHeaders(useAuth)
    })
      .then(response => response.json())
      .then(data => {
        if ('localStorage' in window) {
          const until = Date.now() + cacheTTL;
          localStorage.setItem('bounty.' + repo, JSON.stringify({
            date: until,
            data: data
          }));
          localStorage.setItem('bounty.cached.until', until);
          // untilHolder.innerHTML = (new Date(until)).toLocaleTimeString();
        }
        return data;
      });
  
  
  // fetch single repo from cache or live
  const fetchIssues = (urgent, useAuth) => repo => {
    if ('localStorage' in window) {
      const cached = JSON.parse(localStorage.getItem('bounty.' + repo));
      if (cached) {
        if (Date.now() > cached.date) {
          return fetchRepo(urgent, useAuth, repo);
        }
        else {
          return cached.data;
        }
      }
      else {
        return fetchRepo(urgent, useAuth, repo);
      }
    }
    else {
      return fetchRepo(urgent, useAuth, repo);
    }
  };
  
  
  // parse user and share
  const parseUser = (type, item) => {
    const regexp = new RegExp(type + ':\\s*@?(\\S+)\\s+/\\s+(\\d+)\\s*(%|[a-zA-Z]+)');
    const match = item.body.match(regexp);
    if (match) {
      item[type] = {
        login: match[1] || '',
        share: match[2] || 0,
        unit: match[3] || '%',
        html_url: ''
      };
      console.log(item[type]);
      console.log(match);
      if (match[1].match(/(name)|(open)|(\?+)|(_+)/)) {
        item[type].login = '';
        if (type === 'worker' && item.assignee) {
          item[type].login = item.assignee.login;
          item[type].html_url = item.assignee.html_url;
        }
        else if (type === 'gardener' && item.user) {
          item[type].login = item.user.login;
          item[type].html_url = item.user.html_url;
        }
      }
      else if (match[1]) {
        item[type].html_url = 'https://github.com/' + match[1];
      }
      if (match[2].match(/(share)|(\?+)|(_+)/)) {
        item[type].share = 0;
      }
      else {
        item[type].share = parseInt(item[type].share);
      }
      if (!item[type].login && !item[type].share) {
        item[type] = null;
      }
    }
    else {
      item[type] = null;
    }
  };
  
  
  // parse issues to get additional properties
  const parseIssues = data =>
    data.map(item => {
      // users
      parseUser('gardener', item);
      parseUser('worker', item);
      parseUser('reviewer', item);
      // size
      item.labels.forEach(label => {
        const sizeMatch = label.name.match(/^size-(\S+)/);
        if (sizeMatch) {
          item.size = sizeMatch[1];
        }
      });
      // repo
      item.repository = item.repository_url.replace(originalReposUrl, '');
      // console.log('item', item);
      return item;
    });


  // filter issues by different keys
  const filterIssues = data => {
    return data.filter(item => {
      var hasSize = false;
      item.labels.forEach(label => {
        const sizeMatch = label.name.match(/^size-(\S+)/);
        if (sizeMatch) {
          hasSize = true;
        }
      });
      if (!hasSize) return false;
      if (filternew.checked) {
        if (!item.worker || !item.worker.login) {
          return true;
        }
      }
      else {
        return true;
      }
    });
  };
  
  
  const limitIssues = limit => data => {
    amount = data.length;
    return limit ? data.slice(0, limit) : data
  };
  
  
  // sort issues by different keys
  const sortIssues = order => data => {
    return  data
    .sort((a, b) => {
      return order.dir * (Date.parse(a.created_at) - Date.parse(b.created_at));
    })
    .sort((a, b) => {
      switch(order.key) {
        case 'size':
          return order.dir * (sizes.indexOf(a.size) > sizes.indexOf(b.size) ? 1 : -1);
        break;
        case 'repository':
          return order.dir * (a.repository > b.repository ? 1 : -1);
        break;
        case 'number':
          return order.dir * (a.number > b.number ? 1 : -1);
        break;
        case 'gardener':
          return order.dir * (
            (a.gardener ? a.gardener.login.toLowerCase() : '')
             > (b.gardener ? b.gardener.login.toLowerCase() : '') ? 1 : -1);
        break;
        case 'worker':
          return order.dir * (
            (a.worker ? a.worker.login.toLowerCase() : '')
             > (b.worker ? b.worker.login.toLowerCase() : '') ? 1 : -1);
        break;
        case 'reviewer':
          return order.dir * (
            (a.reviewer ? a.reviewer.login.toLowerCase() : '')
             > (b.reviewer ? b.reviewer.login.toLowerCase() : '') ? 1 : -1);
        break;
        case 'worker_share':
          return order.dir * (
            (a.worker ? a.worker.share : 0)
             > (b.worker ? b.worker.share : 0) ? 1 : -1);
        break;
        case 'reviewer_share':
          return order.dir * (
            (a.reviewer ? a.reviewer.share : 0)
             > (b.reviewer ? b.reviewer.share : 0) ? 1 : -1);
        break;
      }
    });
  };
  
  
  // print issues via template  
  const printIssues = data => {
    bountiesHolder.innerHTML = '';
    data.map(item => {
      const gardener = item.gardener ?
       'by ' + (item.gardener.html_url ?
         `<a href="${item.gardener.html_url}">${item.gardener.login}</a>`
         : `${item.gardener.login}`)
       : '';
      const worker = item.worker ?
       '</br>Worker: ' + (item.worker.html_url ?
         `<a href="${item.worker.html_url}">${item.worker.login}</a>`
         : `${item.worker.login}`)
         + (item.worker.share ? ` ${item.worker.share} ${item.worker.unit}` : '')
       : '';
      const reviewer = item.reviewer ?
       ', Reviewer: ' + (item.reviewer.html_url ?
         `<a href="${item.reviewer.html_url}">${item.reviewer.login}</a>`
         : `${item.reviewer.login}`) + ` ${item.reviewer.share}  ${item.reviewer.unit}`
       : '';
      const size = () => {
        const title = sizeTitles[item.size];
        return item.size ?
        `<span class="bounty-size bounty-size-${item.size}" title="${title}">${item.size}</span>` : ''
      };
      const labels = () => {
        var out = '';
        if (!item.worker) {
          out += `<span class="tag">unassigned</span>`;
        }
        item.labels.forEach(label => {
          if (label.name !== 'bounty' && !label.name.match(/^size-(\S+)/)) {
            out += `<span class="tag">${label.name}</span>`;
          }
        });
        return out;
      };
      const elem = document.createElement('div');
      elem.className = 'bounty';
      elem.innerHTML = `
        <a href="${item.html_url}">${item.title}</a>
        <br/>
        <small>
          ${size()}
          ${(new Date(item.created_at)).toLocaleDateString()}
          ${gardener}
          <span class="bounty-github"></span>
          <a href="${item.repository_url}">${item.repository}</a>
          #${item.number}
          ${labels()}
          ${worker}
          ${reviewer}
        </small>`;
      bountiesHolder.appendChild(elem);
      // attach click
      elem.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return;
        bountiesOverlayContent.innerHTML = '<h2>Bounty</h2>'
         + '<p class="headline">' + elem.innerHTML
         + '</p>' + md.render(item.body);
        // remove all h1
        bountiesOverlayContent.querySelectorAll('h1').forEach(h1 => h1.remove());
        bountiesOverlayHolder.className = 'shown';
        bountiesOverlayHolder.scrollTo(0, 0);
      });
    });
    // add 'show all' link
    if (limit && amount > limit) {
      const linkHolder = document.createElement('div');
      linkHolder.id = 'bounties-link-show-all';
      const link = document.createElement('a');
      link.href = 'javascript:';
      link.innerHTML = `Show all ${amount} ${filternew.checked ? ' unassigned' : ''} bounties`;
      linkHolder.appendChild(link);
      bountiesHolder.appendChild(linkHolder);
      // attach click
      link.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return;
        limit = 0;
        link.parentNode.removeChild(link);
        run(urgentOnly, limit);
      });
    }
  };
  
  
  // show cached until time
  const showUntil = () => {
    if ('localStorage' in window) {
      const until = parseInt(localStorage.getItem('bounty.cached.until'));
      untilHolder.innerHTML = (new Date(until)).toLocaleTimeString();
    }
  };
  // showUntil();
  
  
  // run
  const run = (urgent, limit) => fetchAllIssues(repos, urgent, limit, useAuth, {
    key: orderkey.value,
    dir: orderdir.value
  });
  run(urgentOnly, limit);
  
  
  // attach order selectors
  const attachControls = () => {
    orderkey.addEventListener('change', () => run(urgentOnly, limit));
    orderdir.addEventListener('change', () => run(urgentOnly, limit));
    filternew.addEventListener('change', () => run(urgentOnly, limit));
  };
  attachControls();
  
  // attach overlay events
  const attachOverlay = () => {
    // close link
    bountiesOverlayClose.addEventListener('click', e => {
      e.preventDefault();
      bountiesOverlayHolder.className = '';
    });
    // esc key
    document.addEventListener('keyup', e => {
      if (e.keyCode === 27 && bountiesOverlayHolder.className) {
        e.preventDefault();
        bountiesOverlayHolder.className = '';
      }
    });
  };
  attachOverlay();
  
  // generate sizes legend
  const generateSizeLegend = () => {
    var html = '<table>';
    sizes.forEach(size => {
      const [title, description] = sizeTitles[size].split(',');
      html += 
      `<tr>
        <td><span class="bounty-size bounty-size-${size}">${size}</span></td>
        <td>${title.trim()}</td>
        <td>${description.trim()}</td>
      </tr>`;
    });
    html += '</table>';
    bountySizesHolder.innerHTML = html;
  };
  generateSizeLegend();
  
})();

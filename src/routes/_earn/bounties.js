import { matchSize } from './sizes';

const cacheTTL = 900000; // 15 minutes
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

export function fetchAllIssues(urgent) {
  return (
    Promise.all(repos.map(repo => fetchIssues(repo, urgent)))
    // flatten results - flat array method has poor support
    .then(data => [].concat(...data))
    .then(parseIssues)
    .then(issues => issues.filter(issuesFilter))
    )
  };

const useAuth = false;
const token = ''; // github token in case of useAuth = true

// fetch single repo live and cache it
function fetchRepo(repo, urgent) {
  return fetch(`${reposUrl}${repo}/issues?labels=bounty` + (urgent ? ',urgent' : ''), {
    headers: useAuth ? {'Authorization': `token ${token}`} : {}
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
      }
      return data;
    });
}

function fetchIssues(repo, urgent) {
  if ('localStorage' in window) {
    const cached = JSON.parse(localStorage.getItem('bounty.' + repo));
    if (cached && Date.now() <= cached.date) {
        return cached.data;
    }
  }

  return fetchRepo(repo, urgent);
};

function parseShare(type, string, fallbackUser) {
  const regexp = new RegExp(type + ':\\s*@?(\\S+)\\s+/\\s+(\\d+)\\s*(%|[a-zA-Z]+)');
  const match = string.match(regexp);

  if (!match) {
    return null;
  }

  const share = {
    login: match[1] || '',
    share: match[2] || 0,
    unit: match[3] || '%',
    html_url: ''
  };

  if (share.login.match(/(name)|(open)|(\?+)|(_+)/)) {
    share.login = '';

    if (fallbackUser) {
      share.login = fallbackUser.login;
      share.html_url = fallbackUser.html_url;
    }
  }

  if (share.login) {
    share.html_url = `https://github.com/${share.login}`;
  }

  if (share.share.match(/(share)|(\?+)|(_+)/)) {
    share.share = 0;
  } else {
    share.share = parseInt(share.share, 10);
  }

  if (!share.login && !share.share) {
    return null;
  }

  return share;
}

function parseIssues(issues) {
  issues.forEach(issue => {
    issue.gardener = parseShare('gardener', issue.body, issue.user);
    issue.worker = parseShare('worker', issue.body, issue.assignee);
    issue.reviewer = parseShare('reviewer', issue.body);

    issue.labels = issue.labels.filter(label => label.name.toLowerCase() !== 'bounty');
    const sizeMatch = issue.labels.map(label => label.name.match(/^size-(\S+)/)).find(Boolean);
    if (sizeMatch) {
      issue.size = sizeMatch[1];
    }

    issue.repository = issue.repository_url.replace(originalReposUrl, '');
  });

  return issues;
}

// filter issues by different keys
export const issuesFilter = item => item.labels.map(l => l.name).some(matchSize);

const sortFunctions = {
  size: (a, b) => sizes.indexOf(a.size) - sizes.indexOf(b.size),
  repository: (a, b) => (a.repository > b.repository ? 1 : -1),
  number: (a, b) => a.number - b.number,
  gardener: (a, b) => (a.gardener ? a.gardener.login.toLowerCase() : '') > (b.gardener ? b.gardener.login.toLowerCase() : '') ? 1 : -1,
  worker: (a, b) => (a.worker ? a.worker.login.toLowerCase() : '') > (b.worker ? b.worker.login.toLowerCase() : '') ? 1 : -1,
  reviewer: (a, b) => (a.reviewer ? a.reviewer.login.toLowerCase() : '') > (b.reviewer ? b.reviewer.login.toLowerCase() : '') ? 1 : -1,
  worker_share: (a, b) => (a.worker ? a.worker.share : 0) > (b.worker ? b.worker.share : 0) ? 1 : -1,
  reviewer_share: (a, b) => (a.reviewer ? a.reviewer.share : 0) > (b.reviewer ? b.reviewer.share : 0) ? 1 : -1,
};

export function sortIssues(data, { key, dir }) {
  const sortFunction = sortFunctions[key];
  const sortedByDate = data.sort((a, b) => dir * (Date.parse(a.created_at) - Date.parse(b.created_at)));

  if (!sortFunction) {
    return sortedByDate;
  }
  return sortedByDate.sort((a, b) => dir * sortFunction(a, b));
};

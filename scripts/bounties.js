(function() {

	const urgentOnly = false;
	const useAuth = false;
	const token = 'c7fe8835417fc0d60229b3983c1a076240e9bca0';
	const cacheTTL = 3600000;	// one hour
	const bountiesHolder = document.getElementById('bounties');
	const bountiesOverlayHolder = document.getElementById('bounties-overlay');
	const bountiesOverlayContent = document.getElementById('bounties-overlay-content');
	const bountiesOverlayClose = document.getElementById('bounties-overlay-close');
	const orderkey = document.getElementById('orderkey');
	const orderdir = document.getElementById('orderdir');
	const untilHolder = document.getElementById('until');
	const reposUrl = 'https://api.github.com/repos/leapdao/';
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
	
	const md = window.markdownit({
		html: true,
		breaks: true,
		linkify: true,
		typographer: true
	});
	
	
	// fetch all issues and process them
	const fetchAllIssues = (repos, urgent, useAuth, order) =>
		Promise.all(repos.map(fetchIssues(urgent, useAuth)))
			// flatten results - flat array method has poor support
			.then(data => [].concat(...data))
			.then(parseIssues)
			.then(sortIssues(order))
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
					untilHolder.innerHTML = (new Date(until)).toLocaleTimeString();
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
		const regexp = new RegExp(type + '\\:\\s*\\@?(\\S+)\\s*\\/\\s*(\\d+)');
		const match = item.body.match(regexp);
		if (match) {
			item[type] = {
				login: match[1],
				share: match[2],
				html_url: ''
			};
			if (match[1].match(/(name)|(\?+)|(_+)/)) {
				item[type].login = '?';
			}
			else {
				item[type].html_url = 'https://github.com/' + match[1];
			}
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
			item.repository = item.repository_url.replace(reposUrl, '');
			// console.log('item', item);
			return item;
		});
	
	
	// sort issues by date asc
	const sortIssues = order => data => {
		const sizes = ['XS', 'S', 'M', 'L', 'XL'];
		return  data.sort((a, b) => {
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
				case 'date':
				default:
					return order.dir * (Date.parse(a.created_at) - Date.parse(b.created_at));
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
			 '</br>Worker ' + (item.worker.html_url ?
				 `<a href="${item.worker.html_url}">${item.worker.login}</a>`
				 : `${item.worker.login}`) + ` ${item.worker.share}%`
			 : '';
			const reviewer = item.reviewer ?
			 '</br>Reviewer ' + (item.reviewer.html_url ?
				 `<a href="${item.reviewer.html_url}">${item.reviewer.login}</a>`
				 : `${item.reviewer.login}`) + ` ${item.reviewer.share}%`
			 : '';
			const size = item.size ? ` - Size ${item.size}` : '';
			const elem = document.createElement('div');
			elem.className = 'bounty';
			elem.innerHTML = `
				<a href="${item.html_url}">#${item.number} - ${item.title}</a>
				<br/>
				<small>
					${(new Date(item.created_at)).toLocaleDateString()}
					${gardener}
					<br/>
					<a href="${item.repository_url}">${item.repository}</a>
					${size}
					${worker}
					${reviewer}
				</small>`;
			bountiesHolder.appendChild(elem);
			// attach click
			elem.addEventListener('click', e => {
				if (e.target !== e.currentTarget) return;
				bountiesOverlayContent.innerHTML = '<p>' + elem.innerHTML
				 + '</p>' + md.render(item.body);
				// remove all h1
				bountiesOverlayContent.querySelectorAll('h1').forEach(h1 => h1.remove());
				bountiesOverlayHolder.className = 'shown';
			});
		});
	};
	
	
	// show cached until time
	const showUntil = () => {
		if ('localStorage' in window) {
			const until = parseInt(localStorage.getItem('bounty.cached.until'));
			untilHolder.innerHTML = (new Date(until)).toLocaleTimeString();
		}
	};
	showUntil();
	
	
	// run
	const run = urgent => fetchAllIssues(repos, urgent, useAuth, {
		key: orderkey.value,
		dir: orderdir.value
	});
	run(urgentOnly);
	
	
	// attach order selectors
	const attachSelectors = () => {
		orderkey.addEventListener('change', () => run());
		orderdir.addEventListener('change', () => run());
	};
	attachSelectors();
	
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
	
})();

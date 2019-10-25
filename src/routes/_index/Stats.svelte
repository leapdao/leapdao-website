<script>
  import { onMount } from 'svelte';

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
      }).catch(() => {});
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

  onMount(() => {
    fetchContributors();
    fetchMembers();
    //fetchUTXO();
  });
</script>

<div class="stats">
  <div class="stats-repos">
    <div class="stats-repo">
      <strong id="utxos" class="stats-repo-data"></strong><span>&nbsp;monthly active UTXOs</span>
    </div>
    <div class="stats-repo">
      <strong id="members" class="stats-repo-data"></strong><span>&nbsp;members</span>
    </div>
    <div class="stats-repo">
      <strong id="contributors" class="stats-repo-data"></strong><span>&nbsp;contributors</span>
    </div>
  </div>
</div>

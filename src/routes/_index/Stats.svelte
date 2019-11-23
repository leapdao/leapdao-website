<script>
  import { onMount } from "svelte";

  const fetchContributors = () => {
    fetch("https://api.github.com/orgs/leapdao/repos")
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
        const contributors = document.getElementById("contributors");
        if (contributors) {
          contributors.innerHTML = allContributors.size;
        }
      })
      .catch(() => {});
  };

  const fetchMembers = () => {
    fetch(`https://nplrpwwfw1.execute-api.eu-west-1.amazonaws.com/prod/slack`)
      .then(response => response.json())
      .then(data => {
        const members = document.getElementById("members");
        if (members) {
          members.innerHTML = data;
        }
      });
  };

  const fetchUTXO = () => {
    fetch(`https://n70fngzq9b.execute-api.us-east-1.amazonaws.com/dev/stats/get`)
      .then(response => response.json())
      .then(data => {
        const utxos = document.getElementById("utxos");
        if (utxos) {
            utxos.innerHTML = data.count;
        }
      });
  };

  onMount(() => {
    fetchContributors();
    fetchMembers();
    fetchUTXO();
  });
</script>

<style>
  .stats-repo-data + span {
    margin-right: 2rem;
  }

  .stats-repo-data:empty + span {
    display: none;
    margin-right: 0;
  }
</style>

<div class="stats">
  <div class="stats-repos">
    <div class="stats-repo">
      <strong id="utxos" class="stats-repo-data" />
      <span> monthly active UTXOs</span>
    </div>
    <div class="stats-repo">
      <strong id="members" class="stats-repo-data" />
      <span>&nbsp;members</span>
    </div>
    <div class="stats-repo">
      <strong id="contributors" class="stats-repo-data" />
      <span>&nbsp;contributors</span>
    </div>
  </div>
</div>

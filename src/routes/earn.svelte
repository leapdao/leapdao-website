<script>
  import { onMount } from 'svelte';
  import { sizes, sizeTitles, matchSize } from './_earn/sizes';
  import { fetchRoles } from './_earn/roles';
  import { fetchAllIssues, sortIssues } from './_earn/bounties';
  import BountyPerson from './_earn/BountyPerson';

  const urgentOnly = false;

  let limit = 5;

  let orderkey;
  let orderdir;
  let filternew = true;

  let rolesData = null;
  let issuesData = null;
  let sortedIssues = null;

  $: {
    if (issuesData) {
      sortedIssues = sortIssues(
        issuesData.filter(issue => {
          if (filternew) {
            return !issue.worker;
          }
          return true;
        }),
        {
          key: orderkey,
          dir: Number(orderdir)
        }
      );
    }
  }

  function findByIds(ids, items) {
    return ids.map(id => items.find(i => i.id === id)).filter(Boolean);
  }

  function showAll(e) {
    e.preventDefault();
    limit = 0;
  }

  onMount(() => {
    fetchRoles()
      .then(data => {
        rolesData = data;
      })
      .catch(err => {
        console.error(err);
      });

    fetchAllIssues(urgentOnly)
      .then(issues => {
        issuesData = issues;
      })
      .catch(err => {
        console.log(err);
      });
  });
</script>

<div class="content">
  <header>
    <h1 class="logo">LeapDAO</h1>
    <p>
      Earn with LeapDAO by completing a bounty, taking on a role, or applying for a grant.
    </p>
  </header>

  <h2>Grants</h2>
  <div class="cols">
    <div class="col">
      <p>
        Mass adoption is the next critical step for the blockchain industry.
        Scalable and secure decentralized apps can deliver this vision.
        <br/>Hence we support selected entrepreneurs and teams with grants.
      </p>
    </div>
    <div class="col">
      <p>
        If you are an entrepreneur or team delivering a use-case
        that requires fast and cheap transactions or complex computations,
        we can support you with mentorship and funding.
        <br/>Fill out the form to <a href="https://docs.google.com/forms/d/e/1FAIpQLSeN9N96hkwyuKSR_QF7O_CSfG7gUQ_rA57y9DZjIk7XZEybyg/viewform">apply for a grant</a>.
      </p>
    </div>
  </div>

  <h2>Roles</h2>
  <div class="cols">
    <div class="col">
      <p>
        LeapDAO is an open community operating on
        <a href="https://www.holacracy.org/" target="_blank">Holacracy</a>
        – a non-hierarchical governance methodology.
        There are no job positions, but roles,
        and every partner holds one or more of them.
        Some roles may be vacant from time to time,
        so if you'd like to join our community and take
        a role listed below – join our
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSd8_wDGDAi__HvfYEWNK_bvJzIkxwHHRVL6AFEfJewBd2Vn9A/viewform">Slack</a>
        and express your intention.
        <br/>View our organization <a href="https://app.glassfrog.com/organizations/14849/roles/10883348">Glassfrog</a>.
      </p>
    </div>
    <div class="col">
      <p>
        <a class="nohighlight" href="https://app.glassfrog.com/organizations/14849/roles/10883348">
          <img src="/img/glassfrog-circles.png" width="300" alt="Glassfrog" title="Glassfrog"/>
        </a>
      </p>
    </div>
  </div>
  <div id="roles">
      {#if rolesData}
        {#each rolesData.roles as role}
          <div>
            <p>
              <span class="glassfrog"></span>
              <big>{role.name_with_circle_for_core_roles}</big>
              <br/>
              <small>
                <strong>Purpose:</strong> {role.purpose}
                <br/><strong>Accountabilities:</strong>
              </small>
            </p>
            <ul>
              {#each role.accountabilities as accountability}
                <li>{accountability.description}</li>
              {/each}
            </ul>
            <p class="compact">
              <small>
                <strong>Domains:</strong>
              </small>
              {#each role.domains as domain}
                <span class="tag">{domain.description}</span>
              {/each}
            </p>
          </div>
        {/each}
      {:else}
        <p>Loading...</p>
      {/if}
  </div>

  <h2>Bounties</h2>
  <div class="cols">
    <div class="col">
      <p>
        At LeapDAO we use bounties to reward task completion.
        Take an unassigned bounty from the list, work on it, get reviewed
          and earn money! We pay in DAI, a stablecoin pegged to the US dollar.
        <br/>Some bounties are free to take on
        <a href="https://gitcoin.co/explorer?org=leapdao&idx_status=open&network=mainnet">Gitcoin</a>.
        <br/>Check the <a href="https://github.com/orgs/leapdao/projects/6">Github Bounty Board</a>
        to apply directly and join our <a href="https://docs.google.com/forms/d/e/1FAIpQLSd8_wDGDAi__HvfYEWNK_bvJzIkxwHHRVL6AFEfJewBd2Vn9A/viewform">Slack</a>.
        <br/>You can also <a href="http://bounty.leapdao.org/viewform">propose a new bounty</a>.
      </p>
    </div>
    <div class="col" id="bounty-sizes">
      <table>
        {#each sizes as size}
        <tr>
          <td><span class="bounty-size bounty-size-{size}">{size}</span></td>
          <td>{sizeTitles[size].split(', ')[0].trim()}</td>
          <td>{sizeTitles[size].split(', ')[1].trim()}</td>
        </tr>
        {/each}
      </table>
    </div>
  </div>
  <div class="bounty-controls">
    <div class="cols">
      <div class="col">
        <span>Order by </span>
        <select id="orderkey" bind:value={orderkey}>
          <option value="date">Date</option>
          <option value="size">Size</option>
          <option value="repository">Repository</option>
          <option value="worker_share">Worker Share</option>
          <option value="reviewer_share">Reviewer Share</option>
        </select>
        <select id="orderdir" bind:value={orderdir}>
          <option value="-1">Desc</option>
          <option value="1">Asc</option>
        </select>
      </div>
      <div class="col">
        <input type="checkbox" id="filternew" bind:checked={filternew} checked="checked" />
        <label for="filternew">Unassigned only</label>
      </div>
    </div>
  </div>
  <div id="bounties">
    {#if sortedIssues}
      {#each sortedIssues.slice(0, limit || sortedIssues.length) as issue}
        <div class="bounty">
          <a href="{issue.html_url}">{issue.title}</a>
          <br/>
          <small>
            {#if issue.size}
              <span class="bounty-size bounty-size-{issue.size}" title="{sizeTitles[issue.size]}">{issue.size}</span>
            {/if}
            {(new Date(issue.created_at)).toLocaleDateString()}
            {#if issue.gardener}
              by <BountyPerson person={issue.gardener} />
            {/if}
            <span class="bounty-github"></span>
            <a href="{issue.repository_url}">{issue.repository}</a>
            #{issue.number}
            {#if !issue.worker}
              <span class="tag">unassigned</span>
            {/if}
            {#each issue.labels.filter(label => !matchSize(label.name)) as label}
              <span class="tag">{label.name}</span>
            {/each}
            {#if issue.worker}
              <br />
              Worker: <BountyPerson person={issue.worker} />
            {/if}
            {#if issue.reviewer}
              , Reviewer: <BountyPerson person={issue.reviewer} />
            {/if}
          </small>
        </div>
      {/each}

      {#if limit && sortedIssues.length > limit}
        <div id="bounties-link-show-all">
          <a href="." role="button" on:click={showAll}>
            Show all {sortedIssues.length} {filternew ? ' unassigned' : ''} bounties
          </a>
        </div>
      {/if}
    {:else}
      <p>Loading...</p>
    {/if}
  </div>
  <div class="clear"></div>
</div>

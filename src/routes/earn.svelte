<script>
  import { onMount } from "svelte";
  import { sizes, sizeTitles, matchSize } from "./_earn/sizes";
  import { fetchRoles } from "./_earn/roles";
  import { fetchAllIssues, sortIssues } from "./_earn/bounties";
  import BountyPerson from "./_earn/BountyPerson";
  import Logo from "../components/Logo";

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

<style>
  .bounty-controls {
    margin-top: 3rem;
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  .bounty {
    /*  float: left;*/
    border: 1px solid rgba(0, 0, 0, 0);
    border-left: 2px solid rgba(0, 0, 0, 0.2);
    transition: border-color 0.2s;
    border-radius: 12px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    /*  width: 30rem;*/
    /*  height: 26rem;*/
    font-size: 2rem;
    line-height:3rem;
    margin-bottom: 1rem;
    padding: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }

  .bounty:hover {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-left-width: 2px;
  }

  .bounty small {
    color: #555;
  }

  .tag {
    border-radius: 2px;
    padding: 0px 3px;
    margin-right: 6px;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
  }

  .bounty-size {
    border-radius: 6px;
    padding: 3px 7px;
    color: #fff;
  }

  .bounty-size-XS {
    background-color: #aed83b;
  }

  .bounty-size-S {
    background-color: #51ab47;
  }

  .bounty-size-M {
    background-color: #10c788;
  }

  .bounty-size-L {
    background-color: #1396bd;
  }

  .bounty-size-XL {
    background-color: #0a46de;
  }

  .bounty-github {
    background: center left url(/img/github.svg) no-repeat;
    background-size: 16px 16px;
    padding-left: 19px;
  }

  #filternew,
  label[for="filternew"],
  .bounty-controls span,
  .bounty-controls select {
    vertical-align: middle;
  }

  #filternew {
    margin-right: 6px;
  }

  #bounties {
    margin-top: 3rem;
  }

  #bounties-link-show-all {
    font-size: 1.8rem;
    text-align: center;
  }

  #content-header-less-top-margin {
    margin-top: 2rem;
  }

  .glassfrog {
    background: center left url(/img/glassfrog-logo.png) no-repeat;
    background-size: 25.5px 21.25px;
    padding-left: 30px;
  }

  @media screen and (max-width: 480px) {
    .bounty {
      width: 100%;
    }
  }
</style>

<div class="content">
  <header>
    <Logo />
      <p>
        Are you a developer who is
      </p>

      <ul>
        <li>
          Looking to get started with blockchain technology and want to work with an
          open source community that is focused on a network combining scalability, ease of use and security — all in one
        </li>
        <li>
          Currently working with an unmotivated team and with an organisation that is hierarchy based
        </li>
        <li>
          Looking for a highly motivated team and the companions who believe in you and realize your ideas
        </li>
        <li>
          Willing to work on cutting edge technology
        </li>
      </ul>

      <p id="content-header-less-top-margin">
        then LeapDAO is the right place for you.
      </p>

      <p>
        Join us and earn with LeapDAO by taking on a role or completing a bounty here.
      </p>
  </header>

  <h2>Roles</h2>
  <div class="cols">
    <div class="col">
      <p>
        LeapDAO is an open community operating on
        <a href="https://www.holacracy.org/" target="_blank">Holacracy</a>
        – a non-hierarchical governance methodology. There are no job positions,
        but roles, and every partner holds one or more of them. Some roles may
        be vacant from time to time, so if you'd like to join our community and
        take a role listed below – join our
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSd8_wDGDAi__HvfYEWNK_bvJzIkxwHHRVL6AFEfJewBd2Vn9A/viewform">
          Slack
        </a>
        and express your intention.
        <br />
        View our organization
        <a href="https://app.glassfrog.com/organizations/14849/roles/10883348">
          Glassfrog
        </a>
        .
      </p>
    </div>
    <div class="col">
      <p>
        <a
          class="nohighlight"
          href="https://app.glassfrog.com/organizations/14849/roles/10883348">
          <img
            src="/img/glassfrog-circles.png"
            width="300"
            alt="Glassfrog"
            title="Glassfrog" />
        </a>
      </p>
    </div>
  </div>
  <div id="roles">
    {#if rolesData}
      {#each rolesData.roles as role}
        <div>
          <p>
            <span class="glassfrog" />
            <big>{role.name_with_circle_for_core_roles}</big>
            <br />
            <small>
              <strong>Purpose:</strong>
              {role.purpose}
              <br />
              <strong>Accountabilities:</strong>
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
        At LeapDAO we use bounties to reward task completion. Take an unassigned
        bounty from the list, work on it, get reviewed and earn money! We pay in
        DAI, a stablecoin pegged to the US dollar.
        <br />
        Some bounties are free to take on
        <a
          href="https://gitcoin.co/explorer?org=leapdao&idx_status=open&network=mainnet">
          Gitcoin
        </a>
        .
        <br />
        Apply directly on Github and join our
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSd8_wDGDAi__HvfYEWNK_bvJzIkxwHHRVL6AFEfJewBd2Vn9A/viewform">
          Slack
        </a>
        .
        <br />
        You can also
        <a href="http://bounty.leapdao.org/viewform">propose a new bounty</a>
        .
      </p>
    </div>
    <div class="col" id="bounty-sizes">
      <table>
        {#each sizes as size}
          <tr>
            <td>
              <span class="bounty-size bounty-size-{size}">{size}</span>
            </td>
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
        <span>Order by</span>
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
        <input
          type="checkbox"
          id="filternew"
          bind:checked={filternew}
          checked="checked" />
        <label for="filternew">Unassigned only</label>
      </div>
    </div>
  </div>
  <div id="bounties">
    {#if sortedIssues}
      {#each sortedIssues.slice(0, limit || sortedIssues.length) as issue}
        <div class="bounty">
          <a href={issue.html_url}>{issue.title}</a>
          <br />
          <small>
            {#if issue.size}
              <span
                class="bounty-size bounty-size-{issue.size}"
                title={sizeTitles[issue.size]}>
                {issue.size}
              </span>
            {/if}
            {new Date(issue.created_at).toLocaleDateString()}
            {#if issue.gardener}
              by
              <BountyPerson person={issue.gardener} />
            {/if}
            <span class="bounty-github" />
            <a href={issue.repository_url}>{issue.repository}</a>
            #{issue.number}
            {#if !issue.worker}
              <span class="tag">unassigned</span>
            {/if}
            {#each issue.labels.filter(label => !matchSize(label.name)) as label}
              <span class="tag">{label.name}</span>
            {/each}
            {#if issue.worker}
              <br />
              Worker:
              <BountyPerson person={issue.worker} />
            {/if}
            {#if issue.reviewer}
              , Reviewer:
              <BountyPerson person={issue.reviewer} />
            {/if}
          </small>
        </div>
      {/each}

      {#if limit && sortedIssues.length > limit}
        <div id="bounties-link-show-all">
          <a href="." role="button" on:click={showAll}>
            Show all {sortedIssues.length} {filternew ? ' unassigned' : ''}
            bounties
          </a>
        </div>
      {/if}
    {:else}
      <p>Loading...</p>
    {/if}
  </div>
  <div class="clear" />
</div>

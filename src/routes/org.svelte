<script>
  import { onMount } from "svelte";
  import { fetchRoles } from "./_earn/roles";
  import Logo from "../components/Logo";

  let rolesData = null;

  onMount(() => {
    fetchRoles()
      .then(data => {
        rolesData = data;
      })
      .catch(err => {
        console.error(err);
      });
  });
</script>

<style>
  .glassfrog {
    background: center left url(/img/glassfrog-logo.png) no-repeat;
    background-size: 25.5px 21.25px;
    padding-left: 30px;
  }
</style>

<div class="content">
  <header>
    <Logo />
    <p>
      Help LeapDAO becoming accountable for for one or more vacant Roles.
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
  
  <div class="clear" />
</div>

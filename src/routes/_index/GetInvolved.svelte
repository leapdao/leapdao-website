<script>
  let wantToGetInvolved = false;
</script>

<style>
  p span {
    font-size: 2.5rem;
    padding-right: 10px;
  }

  .goto-page-link {
    font-size: 2rem;
  }

  .goto-page-description {
    margin-bottom: 2rem;
  }
</style>

<header>
  <h2>Get Involved</h2>
  <p>
    <span>Would you like to get involved with us?</span>
    <span>
      <a
        href="/"
        on:click={() => {
          wantToGetInvolved = true;
        }}>
        Yes
      </a>
    </span>
    <span>
      <a
        href="/"
        on:click={() => {
          wantToGetInvolved = false;
        }}>
        No
      </a>
    </span>
  </p>
</header>

{#if wantToGetInvolved}
  <h2>How would you like to be involved?</h2>
  <div class="cols">
    <div class="col">
      <h4>Business</h4>
      <p class="goto-page-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis officia
        nisi ex, alias sunt, dolor optio reprehenderit eveniet reiciendis odio
        aperiam. Ullam corporis temporibus ab accusamus? Sit ab consequatur
        quod.
      </p>
      <a class="goto-page-link" href="/">Goto Page</a>
    </div>
    <div class="col">
      <h4>Development</h4>
      <p class="goto-page-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quisquam,
        voluptates maxime cum distinctio beatae perspiciatis vero et praesentium
        nam earum nemo corrupti molestias doloremque repellat sapiente
        architecto dignissimos adipisci.
      </p>
      <a class="goto-page-link" href="/">Goto Page</a>
    </div>
    <div class="col" />
  </div>
{/if}

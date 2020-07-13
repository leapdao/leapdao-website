<script>
  import Nav from "../components/Nav.svelte";
  import SubscribeForm from "../components/SubscribeForm.svelte";
  import Amoebe from "../components/Amoebe.svelte";

  const segmentClasses = {
    404: "p404"
  };

  export let segment;
</script>
{#if segment !== 'interspace'}
<style>
  .container {
    max-width: 100vw;
    overflow: hidden;
  }
  .page {
    max-width: 80vw;
    min-height: 100vh;
    margin-left: auto;
    margin-right: auto;
    padding-top: 30vh;
  }

  .community :global(header p) {
    margin-top: 4rem;
  }

  .community :global(.subtitle + p) {
    width: 80%;
    margin-top: 1rem;
  }

  .footer {
    border-top: 1px solid #ccc;
    padding-left: 10rem;
    width: 100vw;
    margin-left: -10rem;
    margin-top: 15rem;
  }

  @media screen and (max-width: 900px) {
    .page {
      position: relative;
      z-index: 1;
      padding-top: 14rem;
      overflow: hidden;
    }

    .footer {
      margin-top: 5rem;
      margin-left: -3rem;
      padding-left: 3rem;
      padding-right: 3rem;
    }
  }

  @media screen and (max-width: 600px) {
    .community :global(h1) {
      font-size: 6rem;
      line-height: 1;
      margin-bottom: 0;
    }
  }

  @media screen and (max-width: 400px) {
    .community :global(header h1) {
      font-size: 4rem !important;
    }
  }
</style>

<div class="container">
<div class="page {segmentClasses[segment] || 'community'}">
  {#if segment !== '404'}
    <Amoebe />
  {/if}
  <slot />
  {#if segment !== '404'}
    <footer class="footer">
      <SubscribeForm />
    </footer>
  {/if}
</div>
</div>
{/if}
{#if segment === 'interspace'}
<slot />
{/if}
<Nav {segment} />

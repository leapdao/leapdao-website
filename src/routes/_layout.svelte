<script>
  import Nav from "../components/Nav.svelte";
  import SubscribeForm from "../components/SubscribeForm.svelte";
  import Amoebe from "../components/Amoebe.svelte";

  export let segment;
</script>

<style>
  .page {
    max-width: 120rem;
    min-height: 100vh;
    padding: 30vh 5rem 0 10rem;
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
      padding-left: 3rem;
      padding-right: 3rem;
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

  @media screen and (max-width: 360px) {
    .page {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }
</style>

<div class="page {segment ? '' : 'community'}">
  <slot />
  <footer class="footer">
    <SubscribeForm />
  </footer>
</div>

<Amoebe />
<Nav {segment} />

<script>
  import Stats from "./_index/Stats.svelte";
  import Partners from "./_index/Partners.svelte";
  import Projects from "./_index/Projects.svelte";
  import GhButtons from "./_index/GhButtons.svelte";
</script>

<style>
  .medals {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  @media screen and (max-width: 900px) {
    .medals img {
      width: 100vw;
      height: auto;
      max-width: none;
      margin-left: -3rem;
      margin-right: -3rem;
      flex-shrink: 0;
      order: 1;
    }
  }
</style>

<svelte:head>
  <title>LeapDAO</title>
</svelte:head>
<div class="content">
  <header>
    <h1>LeapDAO</h1>
    <p class="subtitle">Scaling for decentralized apps</p>
    <p>
      We're an open source community scaling blockchains on layer-2.
    </p>
  </header>

  <Stats />
  <Partners />

  <Projects />
  <section class="section">
    <header>
      <h2>Contribute</h2>
    </header>
    <div class="cols">
      <div class="col">
        <h4>Contribute code</h4>
        <p>
          All our code is open-source and stored on
          <a
            href="https://github.com/leapdao"
            target="_blank"
            rel="noopener noreferrer">
            GitHub
          </a>
          . Check out repos, report bugs, find solutions, propose features.
        </p>
      </div>
      <div class="col">
        <h4>Contribute support</h4>
        <p>
          Our aim is to help others build their future. And we also need your
          help for that. Join open Leap community!
        </p>
      </div>
      <div class="col">
        <h4>Get rewarded</h4>
        <p>
          We aim to reward any contribution to LeapDAO using bounties, salaries
          and hourly-based compensation.
        </p>
        <p>
          <a
            href="https://leapdao.org/earn/"
            target="_blank"
            rel="noopener noreferrer">
            Available bounties
          </a>
        </p>
      </div>
    </div>

    <footer>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSd8_wDGDAi__HvfYEWNK_bvJzIkxwHHRVL6AFEfJewBd2Vn9A/viewform"
        target="_blank"
        class="button button-primary">
        Join now
      </a>
    </footer>
  </section>

  <h2>Get involved!</h2>
  <p>
    As an open-source software community, Leap thrives from the efforts of its
    members. Whatever your interests and skills are, there is ample opportunity
    to make the life of Dapps better!
  </p>
</div>

<GhButtons />
<br />
<br />
<div class="medals">
  <img
    src="/img/contrubitons.png"
    width="761"
    height="98"
    alt="Contributions chart" />
</div>

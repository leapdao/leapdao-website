<script>
  import Fa from 'svelte-fa'
  import { faCommentDollar, faHatWizard, faHandshake } from '@fortawesome/free-solid-svg-icons'
  import PeepsMap from "./_index/PeepsMap.svelte";
</script>
<style>

  .cols {
    margin-bottom: 2em;
  }
  .col {
    text-align: center;
  }

</style>

<svelte:head>
  <title>LeapDAO</title>
</svelte:head>
<div class="content">
  <header>
    <h1>LeapDAO</h1>
    <p class="subtitle">Scaling for decentralized apps</p>
  </header>
  <PeepsMap />
  <section class="section">
    <header>
      <h2>We rethink networks</h2>
    </header>
    <p>
      As a Decentralized Adaptive Organization, we&nbsp;combine Holacracy and
      Decentralized Organizations to&nbsp;build a&nbsp;global, self-managing and
      purpose-driven community.
    </p>
    <p>
      We work together to enable economic intimacy for communities and net-citizens:
    </p>
    <div class="cols">
      <div class="col">
        <h4>Sovereignty</h4>
        <p>
          Manage funds and make transparent decisions using on-chain reputation
        </p>
      </div>
      <div class="col">
        <h4>More scalability</h4>
        <p>
          Rollups and state channels connect your members at high speed and low cost.
        </p>
      </div>
      <div class="col">
        <h4>Better UX</h4>
        <p>
          Enable frictionless on-boarding with a seamless user experience.
        </p>
      </div>
    </div>

    <header>
      <h2>Hands On</h2>
    </header>
    <p>
     Get to know the open source community scaling blockchains on layer-2
    </p>
    <div class="cols">
      <div class="col">
        <Fa icon={faHatWizard} size="6x" secondaryOpacity={1} primaryColor="mediumpurple" />
        <h4>Join Us</h4>
        <p>
          <a href="/earn">Become one with LeapDAO</a>
        </p>
      </div>
      <div class="col">
        <Fa icon={faHandshake} size="6x" secondaryOpacity={1} primaryColor="lightseagreen" secondaryColor="linen" />
        <h4>Work with Us</h4>
        <p>
          <a href="/ventures#projects">Leap into partnership</a> 
        </p>
      </div>
      <div class="col">
        <Fa icon={faCommentDollar} size="6x" secondaryOpacity={1} primaryColor="dodgerblue" secondaryColor="gold" />
        <h4>Support Us</h4>
        <p>
          Sponsor the DAO on 
          <a href="https://gitcoin.co/grants/66/leapdao-scaling-for-decentralized-apps" target="_blank">Github</a> or  
          <a href="https://gitcoin.co/grants/66/leapdao-scaling-for-decentralized-apps" target="_blank">Gitcoin</a>
        </p>
      </div>
    </div>
  </section>
</div>

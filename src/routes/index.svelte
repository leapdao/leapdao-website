<script>
  import Fa from "svelte-fa";
  import {
    faCommentDollar,
    faHatWizard,
    faHandshake
  } from "@fortawesome/free-solid-svg-icons";
  import PeepsMap from "./_index/PeepsMap.svelte";
</script>

<style>
  .margin-top {
    margin-top: 5em;
  }
  .big-p {
    font-size: 2.5em;
  }
  .text-center {
    text-align: center;
  }
</style>

<svelte:head>
  <title>LeapDAO</title>
</svelte:head>
<div class="content">
  <section>
    <header>
      <h1>LeapDAO</h1>
      <p class="subtitle">Scaling for decentralized apps</p>
    </header>
    <p class="big-p">
      We work together to enable economic intimacy for communities and
      net-citizens:
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
          Rollups and state channels connect your members at high speed and low
          cost.
        </p>
      </div>
      <div class="col">
        <h4>Better UX</h4>
        <p>Enable frictionless on-boarding with a seamless user experience.</p>
      </div>
      <div class="col">
        <h4>Global Community</h4>
        <p>Our community of leap peeps are located around the world</p>
      </div>
    </div>
  </section>

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
    <p>Need help build a more decentralized world? Get to know the open source community scaling blockchains on layer-2</p>
    <div class="cols margin-top">
      <div class="col text-center">
        <Fa
          icon={faHatWizard}
          size="6x"
          secondaryOpacity={1}
          primaryColor="mediumpurple" />
        <h4>Join Us</h4>
        <p>
          <a href="/earn">Become one with LeapDAO</a>
        </p>
      </div>
      <div class="col text-center">
        <Fa
          icon={faHandshake}
          size="6x"
          secondaryOpacity={1}
          primaryColor="lightseagreen"
          secondaryColor="linen" />
        <h4>Work with Us</h4>
        <p>
          <a href="/ventures#projects">Leap into partnership</a>
        </p>
      </div>
      <div class="col text-center">
        <Fa
          icon={faCommentDollar}
          size="6x"
          secondaryOpacity={1}
          primaryColor="dodgerblue"
          secondaryColor="gold" />
        <h4>Support Us</h4>
        <p>
          Sponsor the DAO at
          <a
            href="https://gitcoin.co/grants/66/leapdao-scaling-for-decentralized-apps"
            target="_blank">
            Gitcoin
          </a>
        </p>
      </div>
    </div>
  </section>
</div>

<script>
  import Fa from "svelte-fa";
  import {
    faLaptopCode,
    faPhone,
    faScroll,
    faObjectGroup,
    faShieldAlt,
    faCoins,
    faUsers,
    faHandshake,
  } from "@fortawesome/free-solid-svg-icons";
  import { faConnectdevelop } from "@fortawesome/free-brands-svg-icons";
  import Logo from "../components/Logo";
  import NewsLetter from "../components/NewsLetter.svelte";
  import Carousel from "@beyonk/svelte-carousel";
  import Projects from "./_index/Projects.svelte";
</script>

<style>
  .flex-container {
    display: flex;
    flex-direction: row;
    margin-top: 3em;
  }

  .car {
    width: 60%;
    margin-top: 15px;
  }

  .width-70 {
    width: 70%;
    margin-left: auto;
  }
  .slide-content {
    width: 100%;
    font-size: 3rem;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  .cols {
    margin-top: 2em;
  }

  .center-text {
    display: flex;
    flex-wrap: wrap;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .section h1 {
    font-size: 8em;
  }

  .cta {
    text-align: center;
    margin-top: 10em;
    padding: 2em;
  }

  .cta:hover {
    background-color: rgb(163, 253, 143);
    border: 1px solid gray;
    cursor: pointer;
  }

  .cta span {
    display: block;
    margin-top: 1em;
    font-size: 2em;
  }

  li {
    list-style: none;
  }
</style>

<div class="content">
  <header class="width-70">
    <p>We work to deliver solutions that enable a more decentralized web</p>
    <div class="flex-container">
      <div class="car">
        <Carousel autoplay={10000} perPage={1}>
          <div class="slide-content">
            <b>Gain sovereignty</b>
            <br />
            Custom gas economies shield you from fluctuation of the base layer
          </div>
          <div class="slide-content">
            <b>Scale instantly</b>
            <br />
            Rollups and state channels give you virtually unlimited throughput
          </div>
          <div class="slide-content">
            <b>Master onboarding</b>
            <br />
            Seamless user experience enables frictionless on-boarding
          </div>
        </Carousel>
      </div>
      <a
        href="https://shrtco.de/leap-contact-request"
        target="_blank"
        class="cta">
        <Fa icon={faLaptopCode} size="8x" />
        <span>Request a Demo</span>
      </a>
    </div>
  </header>
  <section class="section">
    <h1>The Why</h1>
    <p>
      The centralization of the web into the hands of a few tech giants
      threatens the freedom of individuals and the survival of democracy.
      <br />
      LeapDAO seeks to sustainably decentralize power by enabling web-citizens
      to own their data and communities to flourish and govern themselves. We do
      so by providing them with scalable decentralized infrastructure and
      applications.
    </p>
    <NewsLetter />
  </section>

  <section>
    <h2>What we offer to the open web</h2>
    <div class="flex-container">
        <p>
          Stress-tested under real-world circumstances & approved by real people
          we are providing the tech & the knowledge to build a better web.
        </p>
    </div>
    <div class="cols">
      <div class="col center-text">
        <Fa icon={faObjectGroup} size="7x" />
        <p><b>Scaling Playgrounds</b></p>
        <p>
          Get your own customized environment to test your transaction through put
        </p>
      </div>
      <div class="col center-text">
        <Fa icon={faHandshake} size="7x" />
        <p><b>Strategic Consulting</b></p>
        <p>
          Give your business the support and expertise it deserves 
        </p>
      </div>
      <div class="col center-text">
        <Fa icon={faConnectdevelop} size="7x" />
        <p><b>Blockchain Engineering</b></p>
        <p>
          Get the power team you need to release trusted products
        </p>
      </div>
    </div>
    <div class="cols">
      <div class="col center-text">
        <Fa icon={faCoins} size="7x" />
        <p><b>Token Economy Blueprints</b></p>
        <p>
          Get an evaluation on best release plan for your products
        </p>
      </div>
      <div class="col center-text">
        <Fa icon={faShieldAlt} size="7x" />
        <p><b>Security Audits</b></p>
        <p>
          Give your products a second look to safe guard your assets
        </p>
      </div>
      <div class="col center-text">
        <Fa icon={faUsers} size="7x" />
        <p><b>Governance Solutions</b></p>
        <p>
          Get to decentralize your products with our voting protocols
        </p>
      </div>
    </div>
  </section>

  <Projects />

  <section class="section">
    <h2>So Long, and Thanks for All the Fish</h2>
    <div class="cols">
      <div class="col">
        <ul>
          <li>🎉 always keep onboarding</li>
          <li>💪 never compromise security for scalability</li>
          <li>🚀 launch fast, iterate quickly</li>
        </ul>
      </div>
      <a
        href="https://shrtco.de/leap-contact-request"
        target="_blank"
        class="cta col">
        <Fa icon={faPhone} size="10x" />
        <span>Get In Touch</span>
      </a>
    </div>
  </section>
</div>

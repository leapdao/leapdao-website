<script>
  import Carousel from "@beyonk/svelte-carousel";
</script>

<style>
  .word-logo {
    width: 280px;
    margin-top: 35px;
  }
  .image-logo {
    width: 150px;
  }
  .img-wrapper {
    height: 130px;
  }
</style>

<section class="section projects">

  <Carousel autoplay={20000} perPage={1}>
    <div>
      <header>
        <h2>Current Ventures</h2>
        <p>
          By collaborating with unique projects we explore the wide range of
          decentralised applications. Here are the projects already delivering
          decentralized applications powered by LeapDAO:
        </p>
      </header>
      <div class="cols">
        <div class="col">
          <div class="img-wrapper">
            <img class="word-logo" src="/img/logo-status.svg" alt="" />
          </div>
          <p>
            <a href="https://www.status.im/">
              <b>StatusPay</b>
            </a>
          </p>
          <p>
            Enables cryptocurrency-payments in retail stores or other non-remote
            scenarios. The aim is to make purchases as easy and familiar as
            tapping your card to a Point of Sales
          </p>
        </div>
        <div class="col">
          <div class="img-wrapper">
            <img class="image-logo" src="/img/logo-emo.png" alt="" />
          </div>
          <p>
            <a href="https://github.com/leapdao/EthereumMachineOracle">
              <b>EMO</b>
            </a>
          </p>
          <p>
            Project that allows developers to move computations done on some
            abstract machine off-chain
          </p>
        </div>
      </div>
      <div class="cols">
        <div class="col">
          <div class="img-wrapper">
            <img class="word-logo" src="/img/logo-black.png" alt="" />
          </div>
          <p>
            <a href="https://www.whiterabbit.one/">
              <b>WhiteRabbit</b>
            </a>
          </p>
          <p>
            Managing of movie-rights on-chain, enabling peer-to-peer
            distribution and transactions for films.
          </p>
        </div>
        <div class="col">
          <div class="img-wrapper">
            <img class="image-logo" src="/img/logo-nervos.png" alt="" />
          </div>
          <p>
            <a
              href="https://medium.com/nervosnetwork/grant-approved-leapdao-to-build-evm-compatible-sidechain-framework-79657ff80b02">
              <b>Nervos Sidechain Framework</b>
            </a>
          </p>
          <p>
            Partnership with <a href="https://www.nervos.org/" target="_blank">Nervos</a> to build a sidechain framework. First version of
            sidechain supported will be EVM based.
          </p>
        </div>
      </div>
    </div>
    <div>
      <header>
        <h2>Our History</h2>
        <p>Projects that ran on Leap Network</p>
      </header>
      <div class="cols">
        <div class="col">
          <div class="img-wrapper">
            <img  class="image-logo" src="/img/logo-leap.png" alt="" />
          </div>
          <p>
            <a target="_blank" href="https://shrtco.de/plasma-leap">
              <b>Plasma Leap</b>
            </a>
          </p>
          <p>
            Our layer 2 network based on the plasma protocol for doing
            off-chain transactions.
          </p>
        </div>
        <div class="col">
          <div class="img-wrapper">
            <img class="word-logo" src="/img/logo-deora.png" alt="" />
          </div>
          <p>
            <a target="_blank" href="https://ipfs.leapdao.org/blog/quadratic-voting/">
              <b>Volt Congress</b>
            </a>
          </p>
          <p>
            Was a pop-up democracy event held by Deora using Plasma Leap for
            quadratic voting.
          </p>
        </div>

      </div>

      <div class="cols">
        <div class="col">
          <div class="img-wrapper">
            <img class="image-logo" src="/img/logo-peepcash-small.png" alt="" />
          </div>
          <p>
            <a target="_blank" href="https://ipfs.leapdao.org/blog/SunDAI-power-Blocksplit-2019/">
              <b>SunDAI</b>
            </a>
          </p>
          <p>
            Was a pop-up economy running on the Leap Network connected to the
            Ethereum mainnet DAI contract.
          </p>
        </div>
        <div class="col">
          <div class="img-wrapper">
            <img  class="word-logo" src="/img/logo-planeta.png" alt="" />
          </div>
          <p>
            <a target="_blank" href="https://ipfs.leapdao.org/blog/Planet-A-ccc-ethberlin-recap">
              <b>Planet A</b>
            </a>
          </p>
          <p>
            Was a serious social game created by Social Dist0rtion Protocol and
            played at CCcamp and Ethberlin on the Leap Testnet.
          </p>
        </div>
      </div>
    </div>

  </Carousel>

</section>

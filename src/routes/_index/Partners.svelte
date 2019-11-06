<style>
  .partners {
    margin-top: 8rem;
  }

  .partners h4 {
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: 0;
  }

  .partners a:hover {
    background: 0 !important;
  }

  .partners ul {
    flex-wrap: wrap;
    display: flex;
    list-style: none;
    margin: 0;
    align-items: center;
    padding-top: 2rem;
  }

  .partners ul {
    flex-shrink: 0;
  }

  .partners li {
    margin-right: 4rem;
    margin-bottom: 2rem;
  }

  .partners li:first-child {
    margin-left: 0;
  }

  .partners li img {
    width: auto;
  }

  .partner {
    border-bottom: 0 !important;
  }

  @media screen and (max-width: 900px) {
    .partners {
      margin-top: 4rem;
    }

    .partners li {
      margin-top: 1rem;
      margin-bottom: 0;
    }
  }
</style>

<div class="partners">
  <h4>Partners</h4>
  <ul>
    <li>
      <a
        href="https://incubate.status.im/projects/"
        target="_blank"
        rel="noopener"
        class="partner"
        aria-label="Status.im">
        <img src="/img/logo-status.svg" style="height: 40px;" alt="" />
      </a>
    </li>
    <li>
      <a
        href="https://blog.ethereum.org/2018/05/02/announcing-may-2018-cohort-ef-grants/"
        target="_blank"
        rel="noopener"
        class="partner"
        aria-label="Ethereum Foundation">
        <img src="/img/logo-ef-grants.png" style="height: 50px;" alt="" />
      </a>
    </li>
    <li>
      <a
        href="https://github.com/austintgriffith/burner-wallet/"
        target="_blank"
        rel="noopener"
        class="partner"
        aria-label="Burner Wallet">
        <img
          src="/img/logo-burner.png"
          style="height: 60px;margin-top: -10px;"
          alt="" />
      </a>
    </li>
    <li>
      <a
        href="https://gitcoin.co"
        target="_blank"
        rel="noopener"
        class="partner"
        aria-label="Gitcoin">
        <img src="/img/logo-gitcoin.png" style="height: 50px;" alt="" />
      </a>
    </li>
  </ul>
</div>

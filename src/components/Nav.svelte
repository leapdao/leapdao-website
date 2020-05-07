<script>
  export let segment;
</script>

<style>
  .menu {
    font-size: 2rem;
    position: absolute;
    z-index: 100;
    right: 10rem;
    top: 6rem;
    padding: 20px;
    margin-top: -10px;
    margin-right: -10px;
  }

  .menu ul {
    list-style: none;
    display: flex;
    align-items: center;
  }

  .menu li {
    padding: 0 10px;
  }

  .menu a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    background-color: transparent;
  }

  .menu a:hover {
    border-bottom-color: rgba(0, 0, 0, 0.4);
  }

  .menu-icon-link {
    border-bottom: 0 !important;
  }
  .menu-icon-link:hover {
    background: none !important;
  }

  @media screen and (max-width: 900px) {
    .menu {
      font-size: 1.5rem;

      right: 1rem;
      top: 1rem;
    }
  }

  @media screen and (max-width: 360px) {
    .menu {
      left: 0;
      right: 0;
      /* padding: 2rem 1rem; */
    }

    .menu ul {
      justify-content: flex-end;
    }

    .menu li {
      padding: 0 7px;
    }

    .menu-icon-link img[width="26"] {
      width: 20px;
      height: 20px;
    }

    .menu-icon-link img[width="32"] {
      width: 24px;
      height: 24px;
    }
  }
</style>

<menu class="menu">
  <ul>
    <li>
      <a rel="prefetch" href="/">~</a>
    </li>
    <li>
      <a rel="prefetch" href="/about">About</a>
    </li>
    <li>
      <a rel="prefetch" href="/blog">Blog</a>
    </li>
    <li>
      <a href="/resources" rel="prefetch">Resources</a>
    </li>
    <li>
      <a rel="prefetch" href="/earn">Earn</a>
    </li>
    <li>
      <a rel="prefetch" href="/interspace">Interspace</a>
    </li>
    <li>
      <a
        class="menu-icon-link"
        href="https://twitter.com/leapdao"
        target="_blank"
        rel="noopener">
        <img src="/img/twitter.svg" alt="twitter icon" width="26" height="26" />
      </a>
    </li>
    <li>
      <a
        class="menu-icon-link"
        href="https://github.com/leapdao"
        target="_blank"
        rel="noopener">
        <img src="/img/github.svg" alt="github icon" width="32" height="32" />
      </a>
    </li>
  </ul>
</menu>

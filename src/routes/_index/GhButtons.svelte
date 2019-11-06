<script>
  import { onMount } from "svelte";

  onMount(() => {
    import("github-buttons").then(({ render }) => {
      const ref = document.querySelectorAll("a.github-button");
      for (let i = 0, len = ref.length; i < len; i++) {
        render(ref[i], el => {
          ref[i].parentNode.replaceChild(el, ref[i]);
        });
      }
    });
  });
</script>

<div class="stats-repos">
  <div class="stats-repo">
    <h5>leap-core</h5>
    <a
      class="github-button"
      href="https://github.com/leapdao/leap-core"
      data-size="medium"
      data-show-count="true"
      aria-label="Star leapdao/leap-core on GitHub">
      Star
    </a>
  </div>
  <div class="stats-repo">
    <h5>solEVM-enforcer</h5>
    <a
      class="github-button"
      href="https://github.com/leapdao/solEVM-enforcer"
      data-size="medium"
      data-show-count="true"
      aria-label="Star leapdao/solEVM-enforcer on GitHub">
      Star
    </a>
  </div>
  <div class="stats-repo">
    <h5>mobile-wallet</h5>
    <a
      class="github-button"
      href="https://github.com/leapdao/mobile-plasma-wallet"
      data-size="medium"
      data-show-count="true"
      aria-label="Star leapdao/mobile-plasma-wallet on GitHub">
      Star
    </a>
  </div>
  <div class="stats-repo">
    <h5>leap-node</h5>
    <a
      class="github-button"
      href="https://github.com/leapdao/leap-node"
      data-size="medium"
      data-show-count="true"
      aria-label="Star leapdao/leap-node on GitHub">
      Star
    </a>
  </div>
</div>

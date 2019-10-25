<script>
  import { onMount } from "svelte";
  let amoebeCanvas;

  onMount(() => {
    const faviconCanvas = document.createElement("canvas");
    faviconCanvas.width = 32;
    faviconCanvas.height = 32;
    const faviconCtx = faviconCanvas.getContext("2d");
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    document.head.appendChild(favicon);
  });
</script>

<style>
  #amoebe {
    position: absolute;
    top: calc(30vh - 14rem);
    left: 10rem;
  }

  @media screen and (max-width: 900px) {
    #amoebe {
      position: absolute;
      top: -5rem;
      left: -10rem;
      transform: scale(0.5);
    }
  }
</style>

<svelte:head>
  <script src="/amoebe.js" async>

  </script>
</svelte:head>
<canvas id="amoebe" bind:this={amoebeCanvas} />

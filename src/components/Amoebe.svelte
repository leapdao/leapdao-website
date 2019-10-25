<svelte:head>
  <script src="/amoebe.js" async></script>
</svelte:head>

<script>
  import { onMount } from 'svelte';
  let amoebeCanvas;

  onMount(() => {
    const faviconCanvas = document.createElement('canvas');
    faviconCanvas.width = 32;
    faviconCanvas.height = 32;
    const faviconCtx = faviconCanvas.getContext('2d');
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    document.head.appendChild(favicon);

    // setInterval(() => {
    //   faviconCanvas.width = faviconCanvas.width;
    //   faviconCtx.drawImage(
    //     amoebeCanvas,
    //     0,
    //     0,
    //     amoebeCanvas.width,
    //     amoebeCanvas.height,
    //     0,
    //     0,
    //     32,
    //     32
    //   );
    //   favicon.href = faviconCanvas.toDataURL('image/png');
    // }, 100);
  });
</script>

<canvas id="amoebe" bind:this={amoebeCanvas}></canvas>

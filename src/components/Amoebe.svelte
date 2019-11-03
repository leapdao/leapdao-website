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
<canvas id="amoebe" />

<script context="module">
  export async function preload({ params, query }, { siteHost }) {
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data, siteHost };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import { formatDate, authors } from "./_formatters";
  export let post;
  export let siteHost;
</script>

<style>
  .blog-post :global(hr) {
    border: 0;
    border-top: 1px solid #ccc;
    margin-top: 4rem;
  }

  .blog-post header {
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: -4rem;
  }

  .blog-post header h1 {
    font-size: 7rem;
  }

  .blog-post :global(header p) {
    margin: 0;
    font-size: 2rem;
    position: absolute;
    top: calc(-30vh + 6rem);
  }

  .blog-post header + :global(p) {
    font-size: 3.5rem;
    line-height: 5rem;
    margin-top: 6rem;
    width: 100%;
  }

  .blog-post header + :global(p img:first-child:last-child) {
    margin-top: 6rem;
  }

  .blog-post :global(hr) {
    margin-top: 3rem;
  }

  @media screen and (max-width: 900px) {
    .blog-post header h1 {
      font-size: 4rem;
      margin-bottom: 0rem;
    }

    .blog-post :global(header p) {
      font-size: 2rem;
      margin-top: 1.5rem;
      position: relative;
      top: auto;
    }

    .blog-post header + :global(p) {
      font-size: 2.5rem;
      line-height: 4rem;
    }
  }
</style>

<svelte:head>
  <title>{post.metadata.title} | LeapDAO</title>

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@leapdao" />

  {#if post.metadata.image}
    <meta property="og:image" content="{siteHost}/img/blog/{post.metadata.image}" />
    <meta name="twitter:image" content="{siteHost}/img/blog/{post.metadata.image}" />
  {:else if post.metadata.emoji}
    <meta
      property="og:image"
      content="{siteHost}/img/blog/{post.slug}-og.png" />
    <meta
      name="twitter:image"
      content="{siteHost}/img/blog/{post.slug}-og.png" />
  {:else}
    <meta property="og:image" content="{siteHost}/img/og.jpg" />
    <meta name="twitter:image" content="{siteHost}/img/og.jpg" />
  {/if}

  {#if post.metadata.author}
    <meta name="twitter:creator" content={post.metadata.author.twitter} />
  {/if}

  <meta name="twitter:title" content={post.metadata.title} />
  <meta property="og:title" content={post.metadata.title} />

  {#if post.metadata.description}
    <meta name="twitter:description" content={post.metadata.description} />
    <meta property="og:description" content={post.metadata.description} />
  {/if}

  {#if post.slug === 'Slaps-for-the-Chains'}
    <link href="https://vjs.zencdn.net/7.4.1/video-js.css" rel="stylesheet" />
    <script src="https://vjs.zencdn.net/7.4.1/video.js" defer>

    </script>
    <script src="/slaps.js" defer>

    </script>
  {/if}
</svelte:head>

<div class="blog-post">
  <article class="content">
    <header class="blog-post-header">
      <h1>{post.metadata.title}</h1>
    </header>

    {@html post.html}

    <footer>
      <p>
        {formatDate(post.metadata.date)}
        {#if post.metadata.author}
          by
          {@html authors(post)}
        {/if}
      </p>
    </footer>
  </article>
</div>

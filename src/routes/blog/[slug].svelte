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

<svelte:head>
  <title>{post.metadata.title} | LeapDAO</title>

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@leapdao" />

  {#if post.metadata.image}
    <meta property="og:image" content="{siteHost}{post.metadata.image}" />
    <meta name="twitter:image" content="{siteHost}{post.metadata.image}" />
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

<script context="module">
  export function preload({ params, query }) {
    return Promise.all([this.fetch(`blog.json`), this.fetch(`rss.xml`)])
      .then(([r]) => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  import { formatDate, authors } from "./_formatters";
  export let posts;
</script>

<style>
  .blog-index {
    position: relative;
    z-index: 1;
    transform: translateZ(0.01px);
  }

  .blog-item {
    margin-top: 6rem;
  }

  .blog-item h2 {
    font-size: 5rem;
    line-height: 5rem;
    line-height: 1.15;
    margin-bottom: 1rem;
  }

  .blog-item a:not(:hover) {
    background-color: transparent;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  .blog-item p {
    font-size: 2rem;
    margin: 0;
  }

  @media screen and (max-width: 900px) {
    .blog-item {
      margin-top: 3rem;
    }

    .blog-item h2 {
      font-size: 3rem;
      line-height: 1.15;
    }

    .blog-item p {
      font-size: 1.5rem;
      margin-top: 1rem;
    }
  }
</style>

<svelte:head>
  <title>LeapDAO Blog</title>
  <meta
    name="description"
    content="LeapDAO blog. Articles on blockchains, ethereum scaling and plasma" />
  <meta
    name="keywords"
    content="leap, blockchain, plasma, ethereum, scaling, proof of stake" />
  <meta property="og:url" content="https://leapdao.org/blog" />
  <meta name="twitter:title" content="Blog | LeapDAO" />
  <link rel="canonical" href="https://leapdao.org/blog/" />
</svelte:head>

<h1>LeapDAO Blog</h1>

<ul class="blog-index">
  {#each posts as post}
    <div class="blog-item">
      <h2>
        <a href="/blog/{post.slug}" rel="prefetch">{post.metadata.title}</a>
      </h2>
      <p>
        {formatDate(post.metadata.date)}
        {#if post.metadata.author}
          by
          {@html authors(post)}
        {/if}
      </p>
    </div>
  {/each}
</ul>

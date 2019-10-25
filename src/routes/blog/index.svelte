<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  import { formatDate, authors } from "./_formatters";
  export let posts;
</script>

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
        <a href="/blog/{post.slug}">{post.metadata.title}</a>
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

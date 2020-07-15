<script context="module">
  export function preload({ params, query }) {
    return Promise.all([this.fetch(`blog.json`), this.fetch(`rss.xml`)])
      .then(([r]) => r.json())
      .then((posts) => {
        if (query.tag && query.tag != '') {
          posts = posts.filter((post) => {
            if (post.metadata.tags) return post.metadata.tags.includes(query.tag);
          });
        }
        return { posts };
      });
  }
</script>

<script>
  import { formatDate, authors } from "./_formatters";
  export let tags = [
    'plasma', 'ethereum', 'scaling', 'smart contracts',
    'nervos', 'update','dev', 'ecosystem', 'governance', 'voting',
  ];
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
    margin-top: 2rem;
  }

  .blog-item a.tag {
    background-color: rgb(64, 253, 169);
    color: #000;
    border-bottom: none !important;
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

  @media screen and (max-width: 640px) {
    .width-side {
      display: none;
    }
    .width-main {
      width: 100%;
    }
  }

  .flex-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .width-main {
    width: 70%;
  }

  .width-side {
    width: 25%;
    margin-top: 20px;
  }

  .tag {
    border-radius: 3px 0 0 3px;
    display: inline-block;
    line-height: 26px;
    padding: 0 20px 0 23px;
    position: relative;
    margin: 0 10px 10px 0;
    text-decoration: none;
  }

  .tag::before {
    background: #fff;
    border-radius: 10px;
    box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
    content: '';
    height: 6px;
    left: 10px;
    position: absolute;
    width: 6px;
    top: 10px;
  }

  .tag::after {
    background: #fff;
    border-bottom: 13px solid transparent;
    border-left: 10px solid rgb(64, 253, 169);
    border-top: 13px solid transparent;
    content: '';
    position: absolute;
    right: 0;
    top: 0;
  }

  .tag:hover {
    background-color: rgb(163, 253, 143);
  }

  .tag:hover::after {
    border-left-color: rgb(163, 253, 143); 
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
  <meta property="og:url" content="https://ipfs.leapdao.org/blog" />
  <meta name="twitter:title" content="Blog | LeapDAO" />
  <link rel="canonical" href="https://ipfs.leapdao.org/blog/" />
</svelte:head>

<h1>LeapDAO Blog</h1>
<div class="flex-container">
  <div class="width-main">
    <ul class="blog-index">
      {#each posts as post}
        <div class="blog-item">
          <h2>
            <a href="/blog/{post.slug}" rel="prefetch">{post.metadata.title}</a>
          </h2>
          <p>
            {#if post.metadata.description}
              {@html post.metadata.description}
            {/if}
          </p>
          <p>
            {@html post.extract}
          </p>
          <p>
            {formatDate(post.metadata.date)}
            {#if post.metadata.author}
              by {@html authors(post)}
            {/if}
          </p>
          <p>
            {#if post.metadata.tags}
              {#each post.metadata.tags as tag}
                <a class="tag" href="/blog?tag={tag}">{tag}</a>
              {/each}
            {/if}
          </p>
        </div>
      {/each}
    </ul>
  </div>
  <div class="width-side">
    {#each tags as tag}
      <a class="tag" href="/blog?tag={tag}">{tag}</a>
    {/each}
  </div>
</div>




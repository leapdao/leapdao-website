<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`blog/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	import { formatDate, authors } from './_formatters';
	export let post;
</script>

<svelte:head>
	<title>{post.metadata.title}</title>
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
					by {@html authors(post)}
				{/if}
			</p>
		</footer>
	</article>
</div>
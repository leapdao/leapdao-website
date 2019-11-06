import { getPosts } from './_posts.js';


export function get(req, res) {
	const contents = JSON.stringify(getPosts().map(post => ({
    metadata: post.metadata,
    slug: post.slug,
  })));

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}

import { getPosts } from './_posts.js';


export function get(req, res) {
	const contents = JSON.stringify(getPosts());

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}

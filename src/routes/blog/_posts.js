const marked = require('marked');
const frontMatter = require('front-matter');
const fs = require('fs');
const path = require('path');

function getPosts() {
  const slugs = fs
    .readdirSync('src/posts')
    .filter(file => path.extname(file) === '.md')
    .map(file => file.slice(0, -3));

  return slugs.map(getPost).sort((a, b) => {
    return Math.sign(new Date(b.metadata.date) - new Date(a.metadata.date));
  });
}

function getPost(slug) {
  const file = `src/posts/${slug}.md`;
  if (!fs.existsSync(file)) return null;

  const markdown = fs.readFileSync(file, 'utf-8');

  const { content, metadata } = process_markdown(markdown);

  const date = new Date(`${metadata.pubdate} EDT`); // cheeky hack
  metadata.dateString = date.toDateString();

  const html = marked(content);

  return {
    slug,
    metadata,
    html
  };
}

function process_markdown(markdown) {
  const { attributes, body } = frontMatter(markdown);
  return { metadata: attributes, content: body };
}

exports.getPosts = getPosts;
exports.getPost = getPost;

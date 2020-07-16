const marked = require('marked');
const frontMatter = require('front-matter');
const fs = require('fs');
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const parse5 = require('parse5');

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

  let doc = new JSDOM(html) // use this to get first paragraph
  let extract = doc.window.document.querySelectorAll("p")[1].textContent;

  return {
    slug,
    metadata,
    html,
    extract
  };
}

function process_markdown(markdown) {
  const { attributes, body } = frontMatter(markdown);
  return { metadata: attributes, content: body };
}

exports.getPosts = getPosts;
exports.getPost = getPost;

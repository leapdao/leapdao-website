const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function formatDate(date) {
  const d = new Date(date);
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function authorLink(author) {
  if (author.twitter) return `https://twitter.com/${author.twitter}`;
  return author.link;
};

function authorToString(author) {
  const link = authorLink(author);
  if (!link) return author.name;

  return `<a href=\"${link}\" target="_blank" style="padding: 2px 8px;">${author.name}</a>`;
};

export function authors(post) {
  if (!post.metadata.author) return '';
  if (typeof post.metadata.author === 'string') {
    return post.metadata.author;
  }
  if (post.metadata.author.length) {
    return post.metadata.author.map(authorToString).join(', ');
  }
  return authorToString(post.metadata.author);
};

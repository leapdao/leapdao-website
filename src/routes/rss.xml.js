import { Feed } from "feed";
import { getPosts } from "./blog/_posts.js";

function makeAuthor(author) {
  const result = {
    name: author.name,
    link: author.link
  };

  if (author.twitter) {
    result.link = `https://twitter.com/${author.twitter}`;
  }

  return result;
}

export function get(req, res) {
  const posts = getPosts();

  res.writeHead(200, {
    "Content-Type": "text/xml"
  });
  const feed = new Feed({
    title: "LeapDAO Blog",
    id: "https://leapdao.org/blog",
    link: "https://leapdao.org/blog"
  });

  posts.forEach(post => {
    // console.log(post.metadata);
    const item = {
      id: post.slug,
      url: `https://leapdao.org/blog/${post.slug}`,
      title: post.metadata.title,
      description: post.metadata.description,
      date: post.metadata.date,
      content: post.html.replace(
        /src="\/img\/blog\//g,
        'src="https://leapdao.org/img/blog/'
      )
    };

    if (post.metadata.image) {
      item.image = `https://leapdao.org/img/blog${post.metadata.image}`;
    }

    if (post.metadata.author) {
      if (Array.isArray(post.metadata.author)) {
        item.author = post.metadata.author.map(makeAuthor);
      } else {
        item.author = [makeAuthor(post.metadata.author)];
      }
    }

    feed.addItem(item);
  });

  res.end(feed.rss2());
}

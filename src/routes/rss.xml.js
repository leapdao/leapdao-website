import { Feed } from "feed";
import { getPosts } from "./blog/_posts.js";
import { siteHost } from "../server";

function makeAuthor(author) {
  const result = {
    name: author.name,
    email: author.link
  };

  if (author.twitter) {
    result.email = `https://twitter.com/${author.twitter}`;
  }

  return result;
}

function blogPostImage({ slug, metadata }, siteHost = "") {
  if (!metadata.image && metadata.emoji) {
    return `${siteHost}/img/blog/${slug}-og.png`;
  }

  return `${siteHost}${metadata.image}`;
}

export function get(req, res) {
  console.log(req);
  const posts = getPosts();

  res.writeHead(200, {
    "Content-Type": "text/xml"
  });
  const feed = new Feed({
    title: "LeapDAO Blog",
    id: `${siteHost()}/blog`,
    link: `${siteHost()}/blog`,
    image: `${siteHost()}/img/og.jpg`,
    favicon: `${siteHost()}/favicon-32x32.png`,
    description:
      "LeapDAO blog. Articles on blockchains, ethereum scaling and plasma"
  });

  posts.forEach(post => {
    // console.log(post.metadata);
    const item = {
      id: post.slug,
      link: `${siteHost()}/blog/${post.slug}`,
      title: post.metadata.title,
      description: post.metadata.description,
      date: post.metadata.date,
      content: post.html.replace(
        /src="\/img\/blog\//g,
        `src="${siteHost()}/img/blog/`
      )
    };

    if (post.metadata.image || post.metadata.emoji) {
      item.image = blogPostImage(post, siteHost());
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

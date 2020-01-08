import RSS from "rss";
import { getPosts } from "./blog/_posts.js";
import { siteHost } from "../server";

function makeAuthor(author) {
  const result = {
    name: author.name,
    link: author.link
  };

  if (author.twitter) {
    result.link = `https://twitter.com/${author.twitter}`;
  }

  if (result.link) {
    return `${result.name} (${result.link})`;
  }

  return result.name;
}

function blogPostImage({ slug, metadata }, siteHost = "") {
  if (!metadata.image && metadata.emoji) {
    return `${siteHost}/img/blog/${slug}-og.png`;
  }

  return `${siteHost}${metadata.image}`;
}

export function get(req, res) {
  const posts = getPosts();

  res.writeHead(200, {
    "Content-Type": "text/xml"
  });
  const feed = new RSS({
    title: "LeapDAO Blog",
    description:
      "LeapDAO blog. Articles on blockchains, ethereum scaling and plasma",
    site_url: `${siteHost()}/blog`,
    feed_url: `${siteHost()}/rss.xml`,
    image_url: `${siteHost()}/img/og.jpg`,
    language: "en",
    pubDate: new Date().toISOString(),
    ttl: "60",
    custom_namespaces: {
      itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd"
    }
  });

  posts.forEach(post => {
    const item = {
      guid: post.slug,
      url: `${siteHost()}/blog/${post.slug}`,
      title: post.metadata.title,
      date: post.metadata.date,
      description: post.html.replace(
        /src="\/img\/blog\//g,
        `src="${siteHost()}/img/blog/`
      )
    };

    if (post.metadata.image || post.metadata.emoji) {
      item.image = blogPostImage(post, siteHost());
    }

    if (post.metadata.author) {
      if (Array.isArray(post.metadata.author)) {
        item.author = post.metadata.author.map(makeAuthor).join(", ");
      } else {
        item.author = makeAuthor(post.metadata.author);
      }
    }

    feed.item(item);
  });

  res.end(feed.xml());
}

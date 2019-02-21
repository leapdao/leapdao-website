# leapdao-website

## Init

`yarn`
`git submodule init`
`git submodule update`

## Build

`gulp`

## Running locally

1. `gulp dev`
2. Start some http server (for [http-server](https://www.npmjs.com/package/http-server) package — `http-server -c-1`)
3. Open it in the browser (`http://localhost:8080` is default for `http-server`)

You can use [livereload extendsion](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)

## Adding blog articles

Add new file `my-super-article.md` to `src/blog/content/`. Content of the file as follows:

```
---
template: post.html
title:    "Article title goes here"
date:     2018-03-28 00:00:00
image:    image-to-be-used-for-preview.png
author:
  name: name
  twitter: "@handle"
  link: https://github.com/name/
description: short summary of the article and will be shown in twitter preview.
---

Text of the article goes here

```

Adjust filename, `title`, `date`, `image` and text.

- filename - will be used in article URL. E.g. `/blog/my-super-article`.
- `title` - article name. Shown on the article list page and on the article page.
- `date` - article publishing date. Shown on the article list page and on the article page.
Articles on the article list page are sorted by this date (latest first).
- `author` - (optional) either an author name or an object with author details:
  - `name` — name
  - `twitter` — (optional) twitter handle. Will be used in link and in twitter:card
  - `link` — (optional) arbitrary link. If both `link` and `twitter` specified, `twitter` will be used.
- `description` - short summary of the post to be used in previews and snippets (e.g. twitter)
- text - text of the article in [Markdown format](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

Commit the file to github. Our CI server will do the rest and your article will be available
shortly at `test.leapdao.org/blog/my-super-article`.
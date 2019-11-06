const path = require('path');
const fs = require('fs');
const { getPosts } = require('../src/routes/blog/_posts');
const generateOG = require('./card');

(async () => {
  console.log('Blog twitter preview generator');
  const data = getPosts()
    .filter(p => p.metadata.emoji && !p.metadata.image)
    .map(post => ({
      emoji: post.metadata.emoji,
      title: post.metadata.title,
      target: path.join(
        __dirname,
        '..',
        'static',
        'img',
        'blog',
        `${post.slug}-og.png`
      )
    }))
    .filter(({ target }) => !fs.existsSync(target));

  if (data.length === 0) {
    console.log('Nothing to generate');
  }

  for (const { target, emoji, title } of data) {
    if (fs.existsSync(target)) {
      continue;
    }

    console.log(`🖨  ${path.relative(path.join(__dirname, '..'), target)}`);
    await generateOG(emoji, title, target);
  }
})();

const fs = require('fs');
const gulp = require('gulp');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');
const minisite = require('gulp-minisite');
const nunjucks = require('nunjucks');

// const loadBlogPosts = require('./src/gulp/loadBlogPosts');

let watching = false;

const files = {
  js: ['main.js'],
  css: ['main.css'],
  html: '*/*.html',
  blog: 'src/blog/**/*',
  coc: 'leapdao-bounties/CODE_OF_CONDUCT.md',
  bounties: 'leapdao-bounties/README.md'
};

gulp.task('js', () =>
  gulp
    .src(files.js)
    .pipe(plumber())
    .pipe(livereload())
);

gulp.task('css', () =>
  gulp
    .src(files.css)
    .pipe(plumber())
    // .pipe(watching ? noop() : postcss([
    //   autoprefixer({browsers: ['last 2 version']}),
    //   cssnano()
    // ]))
    // .pipe(gulp.dest('css'))
    .pipe(livereload())
);

gulp.task('html', () =>
  gulp
    .src(files.html)
    .pipe(plumber())
    .pipe(livereload())
);

// process.setMaxListeners(0);
// const extractCriticalCSS = file => (
//   critical.generate({
//     inline: true,
//     base: './',
//     src: file,
//     dest: file,
//     width: 1300,
//     height: 700,
//   })
// );

const pageTask = (src, dest, options) => {
  const marked = require('marked');
  const tmplData = {
    page: {}
  };

  tmplData.page.template = 'page-template.html';
  Object.assign(tmplData.page, options);
  tmplData.page.body = fs.readFileSync(src, 'UTF-8');
  const env = new nunjucks.Environment(new nunjucks.FileSystemLoader('src'), {
    noCache: true
  });

  env.addFilter('markdown', function(str) {
    if (!str) return str;
    return new nunjucks.runtime.SafeString(marked(str));
  });

  fs.writeFileSync(dest, env.render('page-template.html', tmplData));
};

gulp.task('blog', () => {
  return gulp
    .src('src/blog/content/**/*')
    .pipe(
      minisite({
        templateEngine(tmplName, tmplData) {
          const marked = require('marked');
          const tinytime = require('tinytime');
          const dateFormat = tinytime('{MM} {DD}, {YYYY}');

          const env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader('src/blog/template'),
            { noCache: true }
          );

          env.addFilter('markdown', function(str) {
            if (!str) return str;
            return new nunjucks.runtime.SafeString(marked(str));
          });

          env.addFilter('formatdate', function(date) {
            return dateFormat.render(date);
          });

          env.addFilter('latestFirst', function(collection) {
            return collection.sort((a, b) => b.date - a.date);
          });

          const authorLink = function(pageData) {
            if (typeof pageData.author === 'string') return '';
            const name = authorName(pageData);
            if (!name) return '';
            const link = pageData.author.twitter
              ? `https://twitter.com/${pageData.author.twitter}`
              : pageData.author.link;
            if (!link) return '';

            return `<a href=\"${link}\">${name}</a>`;
          };

          const authorName = function(pageData) {
            if (!pageData.author) return '';
            return typeof pageData.author === 'string'
              ? pageData.author
              : pageData.author.name;
          };

          if (tmplData.page.template == 'post.html') {
            tmplData.page.authorName = authorName(tmplData.page);
            tmplData.page.authorLink = authorLink(tmplData.page);
          }

          return env.render(tmplName, tmplData);
        }
      })
    )
    .pipe(gulp.dest('blog'))
    .pipe(livereload());
});

gulp.task('bounties', () => {
  if (!fs.existsSync('bounties')) {
    fs.mkdirSync('bounties');
  }
  return pageTask(files.bounties, 'bounties/index.html', {
    title: 'LeapDAO Bounties',
    menu: [{ url: '/', title: '~' }, { url: '/blog', title: 'Blog' }]
  });
});

gulp.task('coc', () => {
  if (!fs.existsSync('coc')) {
    fs.mkdirSync('coc');
  }
  return pageTask(files.coc, 'coc/index.html', {
    title: 'LeapDAO Code Of Conduct',
    menu: [
      { url: '/', title: '~' },
      { url: '/blog', title: 'Blog' },
      { url: '/bounties', title: 'Bounties' }
    ]
  });
});

// gulp.task('critical:blog', (cb) => {
//   setTimeout(() => {
//     glob('blog/**/*.html', (err, matches) => {
//       Promise.all(matches.map(extractCriticalCSS))
//         .then(() => setTimeout(cb, 100));
//     });
//   }, 100);
// });

// gulp.task('blog', (cb) => {
//   runSequence(['css', 'js', 'generate:blog'], 'critical:blog', cb);
// });

// gulp.task('critical:site', (cb) => {
//   setTimeout(() => {
//     extractCriticalCSS('index.html').then(() => setTimeout(cb, 100));
//   }, 100);
// });

gulp.task('dev', ['blog'], () => {
  watching = true;
  livereload.listen();

  watch(files.css, batch((events, done) => gulp.start('css', done)));
  watch(files.js, batch((events, done) => gulp.start('js', done)));
  watch(files.html, batch((events, done) => gulp.start('html', done)));
  watch(files.blog, batch((events, done) => gulp.start('blog', done)));
});

gulp.task('default', ['blog', 'bounties', 'coc']);

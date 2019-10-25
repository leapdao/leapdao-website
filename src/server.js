import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

function siteHost() {
  if (process.env.TRAVIS_BRANCH) {
    if (process.env.TRAVIS_BRANCH === 'master') {
      return 'https://leapdao.org';
    }

    return 'https://test.leapdao.org';
  }

  return `http://localhost:${PORT}`;
}

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: () => ({
        siteHost: siteHost()
      })
    })
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });

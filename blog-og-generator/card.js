const puppeteer = require('puppeteer');
const path = require('path');

const handler = require('serve-handler');
const http = require('http');

function generateCard(emoji, title, dist) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((request, response) => {
      // You pass two more arguments for config and middleware
      // More details here: https://github.com/zeit/serve-handler#options
      return handler(request, response, {
        public: __dirname
      });
    });

    const port = 30000 + Math.round(Math.random() * 1000);
    server.listen(port, async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(
        `http://localhost:${port}#emoji=${encodeURIComponent(
          emoji
        )}&title=${encodeURIComponent(title)}`
      );
      await page.setViewport({ width: 1200, height: 630 });
      await page.screenshot({ path: dist });
      await browser.close();
      server.close(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

module.exports = generateCard;

// generateCard(
//   '🤙',
//   'Cool title with a lot of words',
//   path.join(__dirname, 'card.png')
// );

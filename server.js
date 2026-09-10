const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const GREETING = process.env.GREETING || 'hello from mini-dokploy';

http
  .createServer((req, res) => {
    // Serve any file that was baked into the image, so a change to the repo
    // is visible in the browser after a deploy.
    const name = decodeURIComponent(req.url.slice(1)) || 'index';
    const file = path.join(__dirname, name);

    if (name !== 'index' && file.startsWith(__dirname) && fs.existsSync(file)) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(fs.readFileSync(file, 'utf8'));
      return;
    }

    const files = fs.readdirSync(__dirname);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(
      `${GREETING}\n\n` +
        `deployed at : ${new Date().toISOString()}\n` +
        `files in image:\n` +
        files.map((f) => `  /${f}`).join('\n') +
        `\n`,
    );
  })
  .listen(PORT, () => console.log(`listening on ${PORT}`));


// const http = require('http');

// const PORT = process.env.PORT || 3000;
// const GREETING = process.env.GREETING || 'hello from mini-dokploy';

// http
//   .createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end(`${GREETING}\n`);
//   })
//   .listen(PORT, () => console.log(`listening on ${PORT}`));

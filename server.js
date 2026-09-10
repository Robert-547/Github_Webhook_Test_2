const http = require('http');

const PORT = process.env.PORT || 3000;
const GREETING = process.env.GREETING || 'hello from mini-dokploy';

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`${GREETING}\n`);
  })
  .listen(PORT, () => console.log(`listening on ${PORT}`));

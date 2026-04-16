const http = require('http');
const fs = require('fs');
const path = require('path');

const base = process.cwd();
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4',
};

http
  .createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    if (urlPath === '/') urlPath = '/index.html';

    const filePath = path.join(base, urlPath);
    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not found');
        return;
      }

      res.writeHead(200, {
        'Content-Type': mime[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      });
      fs.createReadStream(filePath).pipe(res);
    });
  })
  .listen(8000, '127.0.0.1', () => {
    console.log('Serving on http://127.0.0.1:8000');
  });

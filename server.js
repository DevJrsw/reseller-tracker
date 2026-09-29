const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const port = Number(process.env.PORT) || 4173;
const mime = {'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8'};
http.createServer((req,res) => {
  if (req.url === '/health') {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    return res.end(JSON.stringify({status:'ok'}));
  }
  const requested = req.url === '/' ? '/index.html' : decodeURIComponent(req.url.split('?')[0]);
  const file = path.resolve(root, `.${requested}`);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (error,data) => {
    if (error) { res.writeHead(error.code === 'ENOENT' ? 404 : 500); return res.end('Not found'); }
    res.writeHead(200, {'Content-Type': mime[path.extname(file)] || 'application/octet-stream'});
    res.end(data);
  });
}).listen(port, '0.0.0.0', () => console.log(`Resellr running on port ${port}`));

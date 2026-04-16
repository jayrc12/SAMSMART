const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Permitir CORS desde cualquier origen
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  
  console.log(`📡 Solicitud: ${req.url} -> ${filePath}`);
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(`❌ Error leyendo ${filePath}: ${err.message}`);
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 - Archivo no encontrado</h1><p>Ruta solicitada: ' + req.url + '</p>');
      return;
    }
    
    // Detectar tipo de contenido
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'text/html; charset=utf-8';
    
    if (ext === '.js') contentType = 'application/javascript; charset=utf-8';
    else if (ext === '.css') contentType = 'text/css; charset=utf-8';
    else if (ext === '.json') contentType = 'application/json; charset=utf-8';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    else if (ext === '.mp4') contentType = 'video/mp4';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
    console.log(`✅ Enviado: ${filePath} (${contentType})`);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n✅ Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📁 Directorio raíz: ${__dirname}`);
  console.log(`🌐 Abre en tu navegador: http://localhost:${PORT}\n`);
});

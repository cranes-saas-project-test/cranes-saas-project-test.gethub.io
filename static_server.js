const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const BASE_DIR = path.join(__dirname, 'client/public/purehtml');

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(BASE_DIR, filePath);

    // Security: prevent directory traversal
    const resolved = path.resolve(filePath);
    if (!resolved.startsWith(BASE_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('<html><body><h1>404 - File Not Found</h1></body></html>');
            } else {
                res.writeHead(500);
                res.end('Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Serving files from: ${BASE_DIR}`);

    // Open browser
    const { exec } = require('child_process');
    exec(`start http://localhost:${PORT}`);
});
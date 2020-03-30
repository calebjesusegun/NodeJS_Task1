const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    let body = '';
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        fs.readFile('./index.html', 'UTF-8', (err, data) => {
            if(err) throw err;
            res.write(data);
            res.end();
        });
    }
    else if (res.method === 'POST') {
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            res.writeHead(200, {'Content-Type' : '/message'});
            res.write(body, () => {
                res.end();
            });
        });
    }
    else {
        res.writeHead(404, {'Content-Type' : 'text/html'});
        res.end('<h1>404 ERROR could not find the Page');
    }
}).listen(8080);

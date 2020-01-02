const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => 
{
    const url = req.url;
    const method = req.method;
    if (url==='/') {
        res.write('<html>');
        res.write('<head><title>Emter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url==='/message' && method==='POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);  // only for illustrative purposes, to see what the chunk looks like
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody=Buffer.concat(body).toString();
            console.log(parsedBody);   // only for illustrative purposes, to see what body converted to string and Buffer object looks liike
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        })
        res.statusCode=302;
        res.setHeader('Location', '/');
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html'); 
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
}
);

server.listen(3000);
const fs = require('fs')

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Udemy NodeJS Homework Assignment 1</title></head>');
        res.write('<body><form action="/create-user" method="POST"><button type ="submit">User Name</button><input type="text" name="username"></form></body>')
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody=Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
        })
        //res.write('<body><h1>Welcome! Enjoy your learning journey!</h1></body>')
        res.statusCode=302;
        res.setHeader('Location', '/');
        return res.end();
    }

    if (url === '/users') {
        res.write('<html>');
        res.write('<head><title>Udemy NodeJS Homework Assignment 1</title></head>');
        res.write('<body><ul><li>Neo</li><li>Morpheus</li><li>Trinity</li></ul></body>')
        res.write('</html>');
        return res.end();      
    }

};




module.exports = requestHandler;
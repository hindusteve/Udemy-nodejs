const http = require('http');

const routeHandler = require('./route');    // custom file, node will look for it in same folder/directory per the './'

const server = http.createServer(routeHandler); // omitting parenthesis after requestHandler argument, b/c don't want it to execute

server.listen(3000);
/*const http = require('http');

function handleRequest(request, response) {
    if (request.url === '/currenttime') {
        response.statusCode = 200;
        response.end('<h1>' + new Date().toISOString() + '</h1>')
    } else {
        response.statusCode = 200;
        response.end('<h1>Welcome to XOXOXO</h1>')
    }
}

const server = http.createServer(handleRequest);

server.listen(3002);*/

const express = require('express');

const app = express();

const htmlElement = "<form><label>Your Name </label><input type='text'></form>"

app.get('/currenttime', function(req, res) {
    res.send('<h1>' + new Date().toISOString() + '</h1>')
})

app.get('/', function(req, res) {
    res.send(htmlElement)
})

app.listen(3004)




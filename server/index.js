#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../middleware');
var debug = require('debug')('mern-stack:server');
var http = require('http');

var config = require('./config');      // retrieves the config file which has our environment variables saved in it (port and host the server listens on and is hosted on ip address)

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(config.port || '3000');     // PORT can also be retrieved from our 'config.js' file so the host, port and other environment variables are configured and imported from process.env all in one place to view all the environment variables together in one place
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, config.host);       // we set the server to listen to not only on the PORT (from server environment variables or by 3000 by default), we also want to add the HOST environment variable from config.js so the server is binded to this same HOST if it is configured specifically on our server. This way the server is binded to the same host as the server that is retrieved in our config file
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
const app = require('../server');
const debug = require('debug')('express-backend:server');
const http = require('http');
const normalizePort = require('normalize-port');

const port = normalizePort(process.env.PORT);
app.set('port', port);

const onListening = ()=>{
    const addr = server.address();
    const bind = typeof addr === 'string'
    ? 'pipe' + addr
    : 'port' + addr.port;
    debug('Listening on ' = bind)
}

const server = http.createServer(app);

const onError = (error)=>{
    if(error.syscall !== 'listen'){
        throw error;
    }
    const bind = typeof port === 'string'
    ? 'Pipe' + port
    : 'Port' + port;

    switch(error.code){
        case 'EACCES':
        console.error(bind = 'requires elevated privileges');
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

server.listen(port);

server.on('error', onError);
server.on('listening, on Listening');
const stage = require('../road.json');
const server = require('server');
const { send, json } = server.reply;
const { get, post } = server.router;
const corsOrigin = require('cors')({
  origin: ['http://localhost:5500'],
});
const cors = server.utils.modern(corsOrigin);

// Launch server with options and a couple of routes
server({ port: 8080, security: { csrf: false } }, cors, [
  post('/createMap', (ctx) => {
    return 'hello';
  }),
]);

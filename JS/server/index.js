const stage = require('../road.json');
const server = require('server');
const { get, post } = server.router;

// Launch server with options and a couple of routes
server({ port: 8080 }, [
  post('/createMap', (ctx) => {
    return true;
  }),
]);

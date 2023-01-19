import server from 'server';
import { makeGraph, pos_to_str } from './Daikusutora/dijkstra.mjs';
import desideNextGoal from './utils/desideNextGoal.js';
import cors from 'cors';

const { status } = server.reply;
const { get, post, error } = server.router;

const newCors = cors({
  origin: ['*', 'http://127.0.0.1:5500', 'http://127.0.0.1:5500/game.html'],
});
const corsOption = server.utils.modern(newCors);

var g;
var map;

// Launch server with options and a couple of routes
server({ port: 8080, security: { csrf: false } }, corsOption, [
  post('/createMap', (ctx) => {
    console.log('created map!');
    map = JSON.parse(ctx.data);
    g = makeGraph(map);
    return status(200).send('Successfully created');
  }),
  post('/newGoal', (ctx) => {
    const from = JSON.parse(ctx.data);
    let finished = false;
    let to, route;
    while (!finished) {
      to = desideNextGoal(map);
      try {
        route = g.dijkstra_shortest_path(
          pos_to_str(from[1], from[0]),
          pos_to_str(to[0], to[1])
        );
      } catch {
        route = false;
      }
      if (route) {
        finished = true;
      }
    }
    return status(200).send(JSON.stringify(route));
  }),

  error((ctx) => status(500).send(ctx.error.message)),
]);

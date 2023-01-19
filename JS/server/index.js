import server from 'server';
import { createMap } from './utils/createMap.mjs';
import { makeGraph, pos_to_str } from './Daikusutora/dijkstra.mjs';
import desideNextGoal from './utils/desideNextGoal.js';
import addPerson from './utils/addPerson.js';
import cors from 'cors';

const { send, json, status } = server.reply;
const { get, post, error } = server.router;

const newCors = cors({
  origin: ['*', 'http://127.0.0.1:5500', 'http://127.0.0.1:5500/game.html'],
});
const corsOption = server.utils.modern(newCors);

const INITIAL_PERSON = 5;
const SIZEX = 20;
const SIZEY = 20;

var map;
var g;
var persons = {};

// Launch server with options and a couple of routes
server({ port: 8080, security: { csrf: false } }, corsOption, [
  get('/createMap', (ctx) => {
    map = createMap(SIZEX, SIZEY);
    g = makeGraph(map);
    persons = addPerson(g, map, INITIAL_PERSON);
    console.log('Created Map');
    return status(200).send(JSON.stringify({ stage: map, persons }));
  }),
  get('/move', (ctx) => {
    let res = [];
    Object.keys(persons).forEach((i) => {
      const currentPos = persons[i].route.shift();
      if (persons[i].route.length == 0) {
        const nextGoal = desideNextGoal(map);
        persons[i].route = g.dijkstra_shortest_path(
          pos_to_str(currentPos[0], currentPos[1]),
          pos_to_str(nextGoal[0], nextGoal[1])
        );
      }
      res.push(currentPos);
    });
    return status(200).send(JSON.stringify(res));
  }),
  get('/getPersonalInfo/:id', (ctx) => {
    const id = ctx.params.id;
    const person = persons[`${id}`];
    return status(200).send(JSON.stringify(person));
  }),

  error((ctx) => status(500).send(ctx.error.message)),
]);

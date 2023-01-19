import desideNextGoal from './desideNextGoal.js';
import { pos_to_str } from '../Daikusutora/dijkstra.mjs';

function addPerson(g, map, number) {
  const res = {};

  for (let i = 0; i < number; i++) {
    const home = desideNextGoal(map);
    const goal = desideNextGoal(map);
    const route = g.dijkstra_shortest_path(
      pos_to_str(home[0], home[1]),
      pos_to_str(goal[0], goal[1])
    );

    res[i] = {
      pos: home,
      to: goal,
      home: home,
      route,
    };
  }

  return res;
}

export default addPerson;

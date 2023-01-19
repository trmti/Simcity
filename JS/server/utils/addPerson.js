import desideNextGoal from './desideNextGoal.js';
import { pos_to_str } from '../Daikusutora/dijkstra.mjs';

function addPerson(g, map, number) {
  const res = {};

  for (let i = 0; i < number; i++) {
    let finished = false;
    let home, goal, res_avoid, route, avoid;

    while (!finished) {
      home = desideNextGoal(map);
      goal = desideNextGoal(map);
      try {
        res_avoid = g.hide_node_dijkstra(
          pos_to_str(home[0], home[1]),
          pos_to_str(goal[0], goal[1])
        );
        route = res_avoid.result;
        avoid = res_avoid.avoid;
      } catch {
        res_avoid = false;
      }
      if (res_avoid) {
        finished = true;
      }
    }

    res[i] = {
      pos: home,
      to: goal,
      home: home,
      route,
      avoid,
    };
  }

  return res;
}

export default addPerson;

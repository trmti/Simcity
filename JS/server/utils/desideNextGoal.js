import { roads } from './objects.js';

function checkAround(map, x, y) {
  const top = y !== 0 ? map[y - 1][x] : undefined;
  const right = x !== map[0].length - 1 ? map[y][x + 1] : undefined;
  const bottom = y !== map.length - 1 ? map[y + 1][x] : undefined;
  const left = x !== 0 ? map[x - 1][y] : undefined;

  if (top && right && bottom && left) {
    if (
      roads.includes(top) ||
      roads.includes(right) ||
      roads.includes(bottom) ||
      roads.includes(left)
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function desideNextGoal(map) {
  const xSize = map[0].length;
  const ySize = map.length;

  let pointX, pointY;
  let finished = false;

  while (!finished) {
    pointX = Math.floor(Math.random() * xSize);
    pointY = Math.floor(Math.random() * ySize);

    if (
      !roads.includes(map[pointY][pointX]) &&
      checkAround(map, pointX, pointY)
    ) {
      finished = true;
    }
  }

  return [pointX, pointY];
}

export function newGoal(map, from) {
  let finished = false;
  let to, route, avoid;
  while (!finished) {
    console.log('new');
    to = desideNextGoal(map);
    try {
      const res = g.hide_node_dijkstra(
        pos_to_str(from[0], from[1]),
        pos_to_str(to[1], to[0])
      );
      route = res.result;
      avoid = res.avoid;
    } catch {
      route = false;
    }
    if (route) {
      finished = true;
    }
  }

  return route;
}

export default desideNextGoal;

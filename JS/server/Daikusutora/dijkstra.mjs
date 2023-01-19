import { Graph } from './Graph.mjs'; //グラフの諸々の処理

export function pos_to_str(i, j) {
  //座標をそのまま頂点の名前にする
  return i + ', ' + j;
}

export function makeGraph(grid) {
  var g = new Graph();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      g.add_node(i + ', ' + j);
    }
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] < 100) {
        if (i != 0 && grid[i - 1][j] < 100) {
          g.connect_node(pos_to_str(j, i), pos_to_str(j - 1, i), 1);
        }
        if (j != 0 && grid[i][j - 1] < 100) {
          g.connect_node(pos_to_str(j, i), pos_to_str(j, i - 1), 1);
        }
      } else {
        if (i != 0 && grid[i - 1][j] < 100) {
          g.connect_node(pos_to_str(j, i), pos_to_str(j - 1, i), 1000);
        } else if (j != 0 && grid[i][j - 1] < 100) {
          g.connect_node(pos_to_str(j, i), pos_to_str(j, i - 1), 1000);
        } else if (i < grid.length - 1 && grid[i + 1][j] < 100) {
          g.connect_node(pos_to_str(j, i), pos_to_str(j + 1, i), 1000);
        } else if (j < grid[i].length - 1 && grid[i][j + 1] < 100) {
          g.connect_node(pos_to_str(j, i), pos_to_str(j, i + 1), 1000);
        }
      }
    }
  }
  return g;
}
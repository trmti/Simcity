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
          g.connect_node(pos_to_str(i, j), pos_to_str(i - 1, j), 1);
        }
        if (j != 0 && grid[i][j - 1] < 100) {
          g.connect_node(pos_to_str(i, j), pos_to_str(i, j - 1), 1);
        }
      } else {
        if (i != 0 && grid[i - 1][j] < 100) {
          g.connect_node(pos_to_str(i, j), pos_to_str(i - 1, j), 1000);
        } else if (j != 0 && grid[i][j - 1] < 100) {
          g.connect_node(pos_to_str(i, j), pos_to_str(i, j - 1), 1000);
        } else if (i < grid.length - 1 && grid[i + 1][j] < 100) {
          g.connect_node(pos_to_str(i, j), pos_to_str(i + 1, j), 1000);
        } else if (j < grid[i].length - 1 && grid[i][j + 1] < 100) {
          g.connect_node(pos_to_str(i, j), pos_to_str(i, j + 1), 1000);
        }
      }
    }
  }
  return g;
}

// console.log(g.dijkstra_shortest_path(pos_to_str(0, 0), pos_to_str(19, 19)));
// var error = [0, 0, 0, 0] //存在しない頂点、接続なし、多すぎる計算回数、その他
// for(let i = 0; i < grid.length; i++)
// {
//     for(let j = 0; j < grid[i].length; j++)
//     {
//         for(let k = 0; k < grid.length; k++)
//         {
//             for(let l = 0; l < grid[i].length; l++)
//             {
//                 try
//                 {
//                     console.log(g.dijkstra_shortest_path(node_name(i, j), node_name(k, l)))
//                 }
//                 catch(e)
//                 {
//                     console.error(e.message)
//                     if(e.message == "存在しない頂点")
//                     {
//                         error[0]++
//                     }
//                     else if(e.message == "接続のない頂点")
//                     {
//                         error[1]++
//                     }
//                     else if(e.message == "多すぎる計算回数")
//                     {
//                         error[2]++
//                     }
//                     else
//                     {
//                         error[3]++
//                     }
//                 }
//             }
//         }
//     }
// }
// console.log(error)
//g.hide_node_dijkstra()

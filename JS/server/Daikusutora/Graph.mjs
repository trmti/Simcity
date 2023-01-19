import { PriorityQueue } from './PriorityQueue.mjs';

export function GNode(node_name) {
  //頂点のクラス 後述のGraphクラスを通して触る
  this.name = node_name; //名前
  this.adjacent = []; //隣接リスト
}

GNode.prototype.connect = function (partner, cost) {
  this.adjacent.push([partner, cost]);
};

function str_to_pos(node_name) {
  return node_name.split(', ').map((str) => Number(str));
}

/*
無向グラフのクラス
頂点クラスのラッパーみたいなもの
いじりたい頂点の指定には頂点の名前を用いるので名前衝突を起こさないこと
*/
export function Graph() {
  this.nodes = {}; //頂点の名前:頂点
}

/*
頂点の追加
ここでは接続情報は追加しない
名前が既存の頂点と被ると勝手に上書きされます
*/
Graph.prototype.add_node = function (node_name) {
  this.nodes[node_name] = new GNode(node_name);
};

Graph.prototype.num = function () //頂点の数
{
  return Object.keys(this.nodes).length;
};

Graph.prototype.connect_node = function (
  nameA,
  nameB,
  cost //頂点どうしを接続
) {
  this.nodes[nameA].connect(nameB, cost);
  this.nodes[nameB].connect(nameA, cost);
};
Graph.prototype.dijkstra_shortest_path = function (nameS, nameG) {
  if (!this.nodes.hasOwnProperty(nameS) || !this.nodes.hasOwnProperty(nameG)) {
    throw new Error('存在しない頂点');
  }
  if (
    this.nodes[nameS].adjacent.length == 0 ||
    this.nodes[nameG].adjacent.length == 0
  ) {
    throw new Error('接続のない頂点');
  }
  let p = new PriorityQueue(); //優先度付きキュー
  let distance = {}; //各頂点の始点からの距離を追加
  let parent = {}; //始点から来るとき自分の直前に通る頂点を保存
  p.enqueue(nameS, 0); //始点は距離0で初期化
  let cnt = 0;
  while (true) {
    let { data: n_name, priority: my_d } = p.dequeue(); //優先度付きキューから距離が最小の頂点を得る
    if (n_name == nameG) {
      //ゴールの距離が確定した時点で終了
      console.log(cnt);
      break;
    }
    if (cnt > this.num()) {
      throw new Error('多すぎる計算回数');
    }
    let n = this.nodes[n_name];
    if (!distance.hasOwnProperty(n.name)) {
      //もう距離が確定してる頂点は捨てる
      distance[n.name] = my_d;
      for (let [next_node_name, cost] of n.adjacent) {
        if (!distance.hasOwnProperty(next_node_name)) {
          //探索し終えた隣接頂点は捨てる
          p.enqueue(next_node_name, my_d + cost); //隣の頂点をキューに追加
          parent[next_node_name] = n.name; //最短路木に追加
        }
      }
      cnt++;
    }
  }
  let current_node = nameG;
  let result = [];
  while (true) {
    //親をたどって経路を得る
    result.unshift(str_to_pos(current_node));
    if (current_node == nameS) {
      break;
    }
    current_node = parent[current_node];
  }
  return result;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
Graph.prototype.hide_node_dijkstra = function () {
  let node_names = Object.keys(this.nodes);
  let remove_node = this.nodes[node_names[getRandomInt(0, node_names.length)]];
  const original_adjacent = remove_node.adjacent;
};

// function getRandomInt(min, max)
// {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min) + min);
// }
// Graph.prototype.hide_node_dijkstra = function(nameS, nameG)
// {
//     let node_names = Object.keys(this.nodes)
//     while(true)
//     {
//         var rm_node_name = node_names[getRandomInt(0, node_names.length)]
//         if(rm_node_name != nameS && rm_node_name != nameG)
//         {
//             break
//         }
//     }
//     console.log(rm_node_name + "is hided.")
//     let remove_node = this.nodes[rm_node_name]
//     let original_adjacent = []
//     for(let i = 0; i < remove_node.adjacent.length; i++)
//     {
//         let buffer = remove_node.adjacent[i].concat()
//         original_adjacent.push(buffer)
//     }
//     for(let i = 0; i < remove_node.adjacent.length; i++)
//     {
//         remove_node.adjacent[i][1] = Infinity
//     }
//     let result = this.dijkstra_shortest_path(nameS, nameG)
//     for(let i = 0; i < original_adjacent.length; i++)
//     {
//         remove_node.adjacent[i] = original_adjacent[i].concat()
//     }
//     return result
// }

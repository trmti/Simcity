// function Graph()
// {
//     this.nodes = {}
// }

// Graph.prototype = {
// add_nodes:function(name){
//     this.nodes[name] = {}
// },
// connect_nodes:function(s, g, cost){
//     this.nodes[s][g] = cost
//     this.nodes[g][s] = cost
// }
// }

// function Heap()
// {
//     this.heap = []
// }
// Heap.prototype =
// {
//     parent:function(index){
//         if(index == 0)
//         {
//             return 0
//         }
//         else if(index % 2 == 0)
//         {
//             return (index - 2)/2
//         }
//         else
//         {
//             return (index - 1)/2
//         }
//     },
//     small_children:function(i)
//     {
//         if(this.heap.length > (2*i + 2))
//         {
//             return this.heap[2*i+1] <= this.heap[2*i+2] ? 2*i+1 : 2*i+2
//         }
//         else if(this.heap.length > (2*i +1))
//         {
//             return this.heap[2*i + 1]
//         }
//         else
//         {
//             return false
//         }
//     },
//     swap:function(a, b)
//     {
//         buf = this.heap[a]
//         this.heap[a] = this.heap[b]
//         this.heap[b] = buf
//     },
//     shift_up:function(i){
//         if(this.heap[this.parent(i)] <= this.heap[i] || i == 0)
//         {
//             return
//         }
//         else
//         {
//             this.swap(i, this.parent(i))
//             this.shift_up(this.parent(i))
//         }
//     },
//     shift_down:function(i)
//     {
//         if(!(this.small_children(i)) || this.heap[this.small_children(i)] >= this.heap[i])
//         {
//             return
//         }
//         else
//         {
//             this.swap(this.small_children(i), i)
//             this.shift_down(this.small_children(i))
//         }
//     },
//     add:function(val)
//     {
//         this.heap.push(val)
//         this.shift_up(this.heap.length-1)
//     },
//     pop:function()
//     {
//         this.swap(0, this.heap.length-1)
//         const result = this.heap[this.heap.length-1]
//         this.heap.pop()
//         this.shift_down(0)
//         return result
//     }
// }
// let bh = new Heap()
// arr = [2, 4, 1, 6, 4, 7, 2, 2, 2, 2, 2, 2, 2, 0]
// for(const e of arr)
// {
//     bh.add(e)
//     console.log(bh.heap)
// }
// console.log(bh.pop())

import { map } from './townmap.mjs'; //Ikkoにもらった街のデータを配列で読み込むのに使用
import { makeGraph, pos_to_str } from './dijkstra.js';

var grid = map();
const g = makeGraph(grid);
console.log(g.dijkstra_shortest_path(pos_to_str(0, 0), pos_to_str(19, 19)));

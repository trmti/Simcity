#include <iostream>
#include <vector>
#include <deque>
#include <boost/graph/adjacency_list.hpp>
#include <boost/graph/dijkstra_shortest_paths.hpp>

using namespace boost;

typedef adjacency_list<listS, vecS, undirectedS, no_property, property<edge_weight_t, int>> Graph;
typedef std::pair<int, int> Edge;
typedef graph_traits<Graph>::vertex_descriptor Vertex;

//駅の定義
enum {
    Yokohama, 
    MusashiKosugi, 
    Kawasaki, 
    Shibuya, 
    Tokyo, 
    N
};
const char* NameList[] = {
    "Yokohama",
    "MusashiKosugi",
    "Kawasaki",
    "Shibuya",
    "Tokyo"
};

int main()
{
    //経路と所要時間
    const std::vector<Edge> edges = {
        {Yokohama, MusashiKosugi}, 
        {Yokohama, Kawasaki},
        {MusashiKosugi, Kawasaki},
        {MusashiKosugi, Shibuya},
        {Kawasaki, Tokyo},
        {Shibuya, Tokyo}
    };
    const std::vector<int> weights = { 
        23,
        14,
        19,
        21,
        24,
        25
    };
    
    //最短経路の探索
    const Graph g(edges.begin(), edges.end(), weights.begin(), N);
    const Vertex from = Yokohama;
    const Vertex to = Tokyo;

    std::vector<Vertex> parents(num_vertices(g));
    std::vector<std::size_t> distance(num_vertices(g));
    dijkstra_shortest_paths(g, from, predecessor_map(&parents[0]).distance_map(&distance[0]));

    //探索結果をリスト化
    std::deque<Vertex> route;
    for (Vertex v = to; v != from; v = parents[v])
    {
        route.push_front(v);
    }
    route.push_front(from);
    for (const Vertex v : route)
    {
        std::cout << NameList[v] << std::endl;
    }
    return 0; 
}
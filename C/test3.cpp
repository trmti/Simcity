#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <deque>
#include <string>
using namespace std;

#include <boost/graph/adjacency_list.hpp>
#include <boost/graph/dijkstra_shortest_paths.hpp>
#include <boost/graph/connected_components.hpp>

#include <jsoncpp/json/json.h>
#include <jsoncpp/json/writer.h>
#include <jsoncpp/json/reader.h>

#include "jsontostr.hpp"
#include "jsontoBoostG.hpp"

#define HEIGHT 5
#define WIDTH 5

struct VertexName
{
    string name;
};

struct EdgeWeight
{
    int weight;
};

typedef boost::adjacency_list<boost::listS, boost::vecS, boost::undirectedS, VertexName, EdgeWeight> Graph; //グラフ
typedef map<int, map<int, Graph::vertex_descriptor>> Vertex_list2d; //2次元のグラフの頂点リスト
typedef boost::graph_traits<Graph>::vertex_descriptor Vertex;

struct Point
{
    int x;
    int y;
};

int main()
{
    Graph G;
    Vertex_list2d V;
    char path[] = "./json/road.json";
    vector<vector<int>> grid(HEIGHT, vector<int>(WIDTH));
    Point start;
        start.x = 0;
        start.y = 0;
    Point goal;
        goal.x = 4;
        goal.y = 3;

    
    string body = conv_json_to_str(path);
    Json::Reader reader;
    Json::Value jsongrid;
    reader.parse(body, jsongrid);

    conv_json_to_array(jsongrid, grid, HEIGHT, WIDTH);
    make_vertex_list(G, V, HEIGHT, WIDTH);
    conv_json_to_boost_g(G, grid, V, HEIGHT, WIDTH);

    cout << "conv is finished." << endl;

    vector<Vertex> parent(num_vertices(G));
    vector<int> distance(num_vertices(G));

    boost::dijkstra_shortest_paths(G, V[start.x][start.y],
            boost::weight_map(boost::get(&EdgeWeight::weight, G)).
            distance_map(&distance[0]).
            predecessor_map(&parent[0]));

    cout << "route search is finished." << endl;

    for(int i = 0; i < HEIGHT; ++i)
    {
        for(int j = 0; j < WIDTH; ++j)
        {
            cout << V[i][j] << " is adjacent with ";
            for(auto itr = adjacent_vertices(V[i][j], G).first; itr != adjacent_vertices(V[i][j], G).second; ++itr)
            {
                cout << *itr << " ";
            }
            cout << endl;
        }
    }

    deque<Vertex> route;
    int a = 0;
    for(Vertex v = V[goal.x][goal.y]; v != V[start.x][start.y]; v = parent[v])
    {
        // if(a > 10){return 1;}
        route.push_front(v);
        // cout << G[v].name << endl;
        // ++a;
    }
    route.push_front(V[start.x][start.y]);

    for(const Vertex v : route)
    {
        cout << G[v].name << " " << endl;
    }
}
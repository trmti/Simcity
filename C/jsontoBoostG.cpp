#include "jsontoBoostG.hpp"

#include <iostream>
#include <vector>
#include <map>
#include <string>
using namespace std;

#include <boost/graph/adjacency_list.hpp>
#include <boost/graph/dijkstra_shortest_paths.hpp>
#include <boost/graph/connected_components.hpp>

#include <jsoncpp/json/json.h>
#include <jsoncpp/json/writer.h>
#include <jsoncpp/json/reader.h>
#include "./jsontostr.hpp"

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

void conv_json_to_array(Json::Value json, vector<vector<int>>& array, int height, int width)
{
    for(int i = 0; i < height; ++i)
    {
        for(int j = 0; j < width; ++j)
        {
            array[i][j] = static_cast<int>(json[i][j].asInt());
        }
    }
}

void make_vertex_list(Graph& G, Vertex_list2d& V, int height, int width)
{   
    for(int i = 0; i < height; ++i)
    {
        for(int j = 0; j < width; ++j)
        {
            V[i][j] = add_vertex(G);
            G[V[i][j]].name = to_string(i) + ", " + to_string(j);
        }
    }
}

void conv_json_to_boost_g(Graph& G, vector<vector<int>>& grid, Vertex_list2d& V, int height, int width)
{
    Graph::edge_descriptor e;
    bool inserted = false;
    for(int i = 0; i < height; ++i)
    {
        for(int j = 0; j < width; ++j)
        {
            if(grid[i][j] < 100)
            {
                if(i != 0 && grid[i-1][j] < 100)
                {
                    boost::tie(e, inserted) = add_edge(V[i][j], V[i-1][j], G);
                    G[e].weight = 1;
                }
                if(j != 0 && grid[i][j-1] < 100)
                {
                    boost::tie(e, inserted) = add_edge(V[i][j], V[i][j-1], G);
                    G[e].weight = 1;
                }
            }
            else
            {
                if(i != 0 && grid[i-1][j] < 100)
                {
                    boost::tie(e, inserted) = add_edge(V[i][j], V[i-1][j], G);
                    G[e].weight = 1000;
                }
                else if(j != 0 && grid[i][j-1] < 100)
                {
                    boost::tie(e, inserted) = add_edge(V[i][j], V[i][j-1], G);
                    G[e].weight = 1000;
                }
                else if(i < (height-1) && grid[i+1][j] < 100)
                {
                    boost::tie(e, inserted) = add_edge(V[i][j], V[i+1][j], G);
                    G[e].weight = 1000;
                }
                else if(j < (width-1) && grid[i][j+1] < 100)
                {
                    boost::tie(e, inserted) = add_edge(V[i][j], V[i][j+1], G);
                    G[e].weight = 1000;
                }
            }
        }
    }
    
}
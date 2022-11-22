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

struct EdgeWeight
{
    int weight;
};

typedef boost::adjacency_list<boost::listS, boost::vecS, boost::undirectedS, boost::no_property, EdgeWeight> Graph; //グラフ
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
                    G[e].weight = 2;
                }
                if(j != 0 && grid[i][j-1] < 100)
                {
                    boost::tie(e, inserted) = add_edge(V[i][j], V[i][j-1], G);
                    G[e].weight = 2;
                }
                if(i < (height-1) && grid[i+1][j] < 100)
                {
                    boost::tie(e, inserted) = add_edge(V[i][j], V[i+1][j], G);
                    G[e].weight = 2;
                }
                if(j < (width-1) && grid[i][j+1] < 100)
                {
                    boost::tie(e, inserted) = add_edge(V[i][j], V[i][j+1], G);
                    G[e].weight = 2;
                }
            }
        }
    }
    
}

int main()
{
    Graph G;
    Vertex_list2d V;
    char path[] = "./json/road.json";
    vector<vector<int>> grid(HEIGHT, vector<int>(WIDTH));
    
    string body = conv_json_to_str(path);
    Json::Reader reader;
    Json::Value jsongrid;
    reader.parse(body, jsongrid);

    conv_json_to_array(jsongrid, grid, HEIGHT, WIDTH);

    for(int i = 0; i < HEIGHT; ++i)
    {
        for(int j = 0; j < WIDTH; ++j)
        {
            cout << grid[i][j] << " ";
        }
        cout << endl;
    }

    make_vertex_list(G, V, HEIGHT, WIDTH);

    // for(int i = 0; i < HEIGHT; ++i)
    // {
    //     for(int j = 0; j < WIDTH; ++j)
    //     {
    //         cout << V[i][j] << " ";
    //     }
    //     cout << endl;
    // }

    conv_json_to_boost_g(G, grid, V, HEIGHT, WIDTH);

    cout << num_edges(G) << endl;
    // vector<int> component(num_vertices(G));
    // int num = connected_components(G, &component[0]);
    // for(auto i = 0; i != component.size(); ++i)
    // {
    //     cout << "vertex" << i << " is in component " << component[i] << endl;
    // }
}
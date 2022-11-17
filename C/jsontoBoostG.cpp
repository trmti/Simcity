#include <iostream>
using namespace std;

#include <boost/graph/adjacency_list.hpp>
#include <boost/graph/dijkstra_shortest_paths.hpp>

#include <jsoncpp/json/json.h>
#include <jsoncpp/json/writer.h>
#include <jsoncpp/json/reader.h>
#include "./jsontostr.hpp"

typedef boost::adjacency_list<boost::vecS, boost::vecS, boost::undirectedS> Graph;
typedef std::map<int, Graph::vertex_descriptor> Vertex_list;

int* json_to_array(Json::Value json, int height, int width)
{
    int array[height][width] = {{0},};
    for(int i = 0; i < height; ++i)
    {
        for(int j = 0; j < height; ++j)
        {
            array[i][j] = static_cast<int>(json[i][j].asInt());
        }
    }
}

void conv_json_to_boost_g(Graph& G, Json::Value jsonmap, int height, int width, Vertex_list& V)
{
    for(int i = 0; i < (height * width); ++i)
    {
        V[i] = add_vertex(G);
    }
    
    for(int i = 0; i < height; ++i)
    {
        for(int j = 0; j < width; ++j)
        {
            if(jsonmap[i][j] == 0) //読み込んだグリッドが道路だった場合
            {
                if(i != 0)
                {
                    add_edge(jsonmap[i][j].asInt(), jsonmap[i-1][j].asInt(), G);
                }
                if(j != 0)
                {
                    add_edge(jsonmap[i][j], jsonmap[i][j-1], G);
                }
            }
        }
    }
    
}

int main()
{
    Graph G;
    Vertex_list V;

    //conv_json_to_boost_g(G, 5, 5, V);

    //cout << num_vertices(G) << endl;
}
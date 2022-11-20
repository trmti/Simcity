#include <iostream>
#include <vector>
using namespace std;

#include <boost/graph/adjacency_list.hpp>
#include <boost/graph/dijkstra_shortest_paths.hpp>

#include <jsoncpp/json/json.h>
#include <jsoncpp/json/writer.h>
#include <jsoncpp/json/reader.h>
#include "./jsontostr.hpp"

#define JSONWIDTH 5
#define JSONHEIGHT 5

typedef boost::adjacency_list<boost::vecS, boost::vecS, boost::undirectedS> Graph;
typedef std::map<int, Graph::vertex_descriptor> Vertex_list;

void json_to_array(Json::Value json, int array[JSONHEIGHT][JSONWIDTH])
{
    for(int i = 0; i < JSONHEIGHT; ++i)
    {
        for(int j = 0; j < JSONWIDTH; ++j)
        {
            array[i][j] = static_cast<int>(json[i][j].asInt());
        }
    }
}

//
void conv_json_to_boost_g(Graph& G, int array[JSONHEIGHT][JSONWIDTH], Vertex_list& V)
{
    for(int i = 0; i < (JSONHEIGHT * JSONWIDTH); ++i)
    {
        V[i] = add_vertex(G);
    }
    
    for(int i = 0; i < JSONHEIGHT; ++i)
    {
        for(int j = 0; j < JSONWIDTH; ++j)
        {
            if(array[i][j] < 100)
            {
                switch (array[i][j])
                {
                    case 0:
                        if(j != 0){ add_edge(V[i*JSONWIDTH + (j-1)], V[i*JSONWIDTH + j], G); }
                        break;
                    case 1:
                        if(i != 0){ add_edge(V[(i-1)*JSONWIDTH + j], V[i*JSONWIDTH + j], G); }
                        break;
                    case 2:
                        add_edge(V[i][j-1], V[i][j], G);
                        add_edge(V[i-1][j], V[i][j], G);
                }
            }
        }
    }
    
}

int main()
{
    Graph G;
    Vertex_list V;
    char path[] = "./json/road.json";
    int array[JSONHEIGHT][JSONWIDTH];
    
    string body = conv_json_to_str(path);
    Json::Reader reader;
    Json::Value map;
    reader.parse(body, map);

    json_to_array(map, array);

    for(int i = 0; i < JSONHEIGHT; ++i)
    {
        for(int j = 0; j < JSONWIDTH; ++j)
        {
            cout << array[i][j] << endl;
        }
    }

    //conv_json_to_boost_g(G, 5, 5, V);

    //cout << num_vertices(G) << endl;
}
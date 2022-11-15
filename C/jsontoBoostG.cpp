#include <iostream>
using namespace std;

#include <boost/graph/adjacency_list.hpp>
#include <boost/graph/dijkstra_shortest_paths.hpp>

#include <jsoncpp/json/json.h>
#include <jsoncpp/json/writer.h>
#include <jsoncpp/json/reader.h>
#include "./jsontostr.hpp"

typedef boost::adjacency_list<boost::vecS, boost::vecS, boost::undirectedS> Map;

void conv_json_to_boost_g(Map& G, Json::Value jsonmap, int height, int width)
{
    for(int i = 0; i < height; ++i)
    {
        for(int j = 0; j < width; ++j)
        {
            
        }
    }
}
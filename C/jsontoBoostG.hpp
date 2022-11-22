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

struct VertexName;
struct EdgeWeight;

typedef boost::adjacency_list<boost::listS, boost::vecS, boost::undirectedS, VertexName, EdgeWeight> Graph; //グラフ
typedef map<int, map<int, Graph::vertex_descriptor>> Vertex_list2d; //2次元のグラフの頂点リスト

void conv_json_to_array(Json::Value json, vector<vector<int>>& array, int height, int width);

void make_vertex_list(Graph& G, Vertex_list2d& V, int height, int width);

void conv_json_to_boost_g(Graph& G, vector<vector<int>>& grid, Vertex_list2d& V, int height, int width);
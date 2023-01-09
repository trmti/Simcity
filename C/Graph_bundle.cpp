#include <iostream>
#include <string>
using namespace std;

#include <boost/graph/adjacency_list.hpp>
#include <boost/graph/dijkstra_shortest_paths.hpp>

struct EdgeWeight
{
    int weight;
};

typedef boost::adjacency_list<boost::listS, boost::vecS, boost::undirectedS, boost::no_property, EdgeWeight, boost::no_property> Graph;

int main()
{
    Graph G;

    Graph::vertex_descriptor v1 = add_vertex(G);
    Graph::vertex_descriptor v2 = add_vertex(G);

    Graph::edge_descriptor e;
    bool inserted = false;

    boost::tie(e, inserted) = add_edge(v1, v2, G);
    G[e].weight = 100;

}
#include <iostream>
#include <cstdlib>
#include <exception>
#include <fstream>
#include <string>
using namespace std;

#include <jsoncpp/json/json.h>
#include <jsoncpp/json/writer.h>
#include <jsoncpp/json/reader.h>
#include "./jsontostr.hpp"

int main()
{
    char path[20] = "./json/persons.json";
    string body = conv_json_to_str(path);

    /*
    ifstream ifs("./json/persons.json");
    
    string line;
    string body = "";

    if(ifs.fail())
    {
        cout << "Failed to open file." << endl;
        return -1;
    }

    while(getline(ifs, line))
    {
        body.append(line);
    }
    */
    
    Json::Reader reader;
    Json::Value value;
    reader.parse(body, value);
    cout << value[1]["home"][0] << endl;
}
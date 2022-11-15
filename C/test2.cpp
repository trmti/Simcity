#include <iostream>
using namespace std;

#include <jsoncpp/json/json.h>
#include <jsoncpp/json/writer.h>
#include <jsoncpp/json/reader.h>
#include "./jsontostr.hpp"

int main()
{
    char path[20] = "./json/persons.json";
    string body = conv_json_to_str(path);
    Json::Reader reader;
    Json::Value value;
    reader.parse(body, value);

    cout << value[0]["home"] << endl;
}
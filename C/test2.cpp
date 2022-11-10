#include <iostream>
#include <cstdlib>
#include <exception>
#include <fstream>
#include <string>
using namespace std;

#include <jsoncpp/json/json.h>
#include <jsoncpp/json/writer.h>
#include <jsoncpp/json/reader.h>

int main()
{
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
        //cout << "#" << line << endl;
        body.append(line);
    }
    //cout << body << endl;
    
    Json::Reader reader;
    Json::Value value;
    reader.parse(body, value);
    cout << value[0]["id"] << endl;
}
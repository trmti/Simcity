#include <iostream>
#include <fstream>
#include <string>
using namespace std;

#include "jsontostr.hpp"

string conv_json_to_str(char* f_path)
{
    ifstream ifs(f_path);
    string line;
    string body = "";

    if(ifs.fail())
    {
        cout << "Couldn't open file." << endl;
    }
    else
    {
        while(getline(ifs, line))
        {
            body.append(line);
        }

        return body;
    }
    return "";
}
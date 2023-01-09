#include <iostream>
#include <vector>
#define E 10
using namespace std;

int main()
{
    vector<vector<int>> a(E, vector<int>(E));
    int n = 0;
    
    while(n < 2)
    {
        for(int i = 0; i < E; i++)
        {
            for(int j = 0; j < E; j++)
            {
                if(n == 0){a[i][j] = 5;}
                if(n == 1){cout << a[i][j];}
            }
            if(n == 1){cout << endl;}
        }
        n += 1;
    }
}
#include <iostream>
using namespace std;

void func(int h, int w, int arr[h][w])
{
    for(int i = 0; i < h; ++i)
    {
        for (int j = 0; j < w; ++j)
        {
            cout << arr[h][w] << endl;
        }
    }
}

int main()
{
    int arr[2][3] = 
    {
        {1, 2, 3},
        {4, 5, 6}
    };

    func(2, 3, arr);
}
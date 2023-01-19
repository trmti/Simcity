#pragma once

#include <drogon/HttpController.h>

using namespace drogon;

namespace jstest
{
class v1 : public drogon::HttpController<v1>
{
  public:
    METHOD_LIST_BEGIN
    // use METHOD_ADD to add your custom processing function here;
    // METHOD_ADD(v1::get, "/{2}/{1}", Get); // path is /jstest/v1/{arg2}/{arg1}
    // METHOD_ADD(v1::your_method_name, "/{1}/{2}/list", Get); // path is /jstest/v1/{arg1}/{arg2}/list
    // ADD_METHOD_TO(v1::your_method_name, "/absolute/path/{1}/{2}/list", Get); // path is /absolute/path/{arg1}/{arg2}/list

    METHOD_ADD(v1::getInfo, "/info/{1}", Get);
    // METHOD_ADD(v1::getRoute, "/route/{1}", Get);

    METHOD_LIST_END
    // your declaration of processing function maybe like this:
    // void get(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback, int p1, std::string p2);
    // void your_method_name(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback, double p1, int p2) const;

    void getInfo(const HttpRequestPtr &req,
              std::function<void(const HttpResponsePtr &)> &&callback,
              std::string userId) const;
    
    // void getRoute(const HttpRequestPtr &req,
    //           std::function<void(const HttpResponsePtr &)> &&callback,
    //           std::string userId) const;


};
}

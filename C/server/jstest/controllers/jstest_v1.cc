#include "jstest_v1.h"
using namespace jstest;

// Add definition of your processing function here

int a = 1;

void v1::getInfo(
    const HttpRequestPtr &req,
    std::function<void(const HttpResponsePtr &)> &&callback,
    std::string userId
) const {
    LOG_DEBUG << "User " << userId << " get his infomation.";

    Json::Value ret;

    ret["result"] = "ok";
    ret["user_name"] = "Jack";
    ret["user_id"] = userId;
    ret["gender"] = a;

    auto resp = HttpResponse::newHttpJsonResponse(ret);
    callback(resp);
}

// void v1::getRoute(
//     const HttpRequestPtr &req,
//     std::function<void(const HttpResponsePtr &)> &&callback,
//     std::string userId
// ) const {
//     LOG_DEBUG << "User " << userId << " get his route.";

//     Json::Value ret;

//     ret["result"] = "ok";
//     ret["user_name"] = "Jack";
//     ret["user_id"] = userId;
//     ret["gender"] = 1;

//     auto resp = HttpResponse::newHttpJsonResponse(ret);
//     callback(resp);
// }
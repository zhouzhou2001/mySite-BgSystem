import request from "@/utils/request";

//设置关于我url
export function setAbout(data) {
  return request({
    url: "/api/about",
    method: "post",
    data,
  });
}
//获取关于我url
export function getAbout() {
  return request({
    url: "/api/about",
    method: "get",
  });
}

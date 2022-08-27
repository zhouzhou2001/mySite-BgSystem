import request from "@/utils/request";

// 用户登录
export function loginApi(data) {
  return request({
    url: "/api/admin/login",
    method: "post",
    data,
  });
}
//重新登录
export function getInfo() {
  return request({
    url: "/api/admin/whoami",
    method: "get",
  });
}
//退出登录
export function logout() {
  localStorage.removeItem("adminUser");
}
//更新管理员信息
export function setAdmin(data) {
  return request({
    url: "/api/admin",
    method: "put",
    data,
  });
}

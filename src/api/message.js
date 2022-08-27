import request from "@/utils/request";

//分页获取留言
export function getMessage(page, limit) {
  return request({
    url: "/api/message",
    method: "get",
    params: {
      page,
      limit,
    },
  });
}
//删除留言
export function delMessage(id) {
  return request({
    url: `/api/message/${id}`,
    method: "delete",
  });
}

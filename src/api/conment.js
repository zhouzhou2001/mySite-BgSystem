import request from "@/utils/request";

//分页获取评论
export function getConment(page, limit) {
  return request({
    method: "get",
    url: "/api/comment",
    params: {
      page,
      limit,
    },
  });
}
//删除评论
export function delConment(id) {
  return request({
    method: "delete",
    url: `/api/comment/${id}`,
  });
}

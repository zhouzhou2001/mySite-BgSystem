import request from "@/utils/request";

//获取分页文章列表
export function getBlogList(
  page = 1,
  limit = 10,
  keyWord = "",
  categoryId = -1
) {
  return request.get("/api/blog", {
    params: {
      page,
      limit,
      keyWord,
      categoryId,
    },
  });
}
//删除单个文章
export function delOneBlog(id) {
  return request.delete(`api/blog/${id}`);
}
// 添加文章
export function addBlog(data) {
  return request({
    url: "/api/blog",
    method: "post",
    data,
  });
}
//编辑文章
export function editBlog(id, data) {
  return request({
    url: `/api/blog/${id}`,
    method: "put",
    data,
  });
}
//获取一个文章
export async function getOneBlog(id) {
  return await request.get(`/api/blog/${id}`);
}

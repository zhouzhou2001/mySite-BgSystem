import require from "@/utils/request";

//添加分类
export function addBlogType(data) {
  return require({
    url: "/api/blogtype",
    method: "post",
    data,
  });
}
//获取一个分类
export function getOneBlogType(id) {
  return require.get(`/api/blogtype/${id}`);
}
//删除分类
export function delBlogType(id) {
  return require.delete(`/api/blogtype/${id}`);
}
//修改分类
export function editBlogType(id, data) {
  return require({
    url: `/api/blogtype/${id}`,
    method: "put",
    data,
  });
}
//获取文章分类
export function getAllBlogType() {
  return require.get(`/api/blogtype`);
}

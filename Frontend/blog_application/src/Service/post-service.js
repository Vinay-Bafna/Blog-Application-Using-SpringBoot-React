import { myAxios, privateAxios } from "./AxiosHelper.js";

//Create Post Function
export const doCreatePost = (postData) => {
  // console.log(postData);
  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.postCategoryID}/posts`,
      postData
    )
    .then((response) => response.data);
};

//get all post from backend
export const doGetAllPosts = (pageNumber, pageSize) => {
  return myAxios
    .get(
      `/posts?pagenumber=${pageNumber}&pagesize=${pageSize}&sortby=addedDate&sortorder=desc`
    )
    .then((response) => response.data);
};

//get single post Details from backend.
export const doGetSinglePost = (postId) => {
  return myAxios.get(`/posts/${postId}`).then((response) => response.data);
};

//get User Related Posts.
export const getAllPostByUser = (userId, pageNumber, pageSize) => {
  return myAxios
    .get(
      `/user/${userId}/posts?pagenumber=${pageNumber}&pagesize=${pageSize}&sortby=addedDate&sortorder=desc`
    )
    .then((response) => response.data);
};

//Delete Post
export const deletePost = (postId) => {
  return privateAxios.delete(`/posts/${postId}`).then((response) => {
    return response.data;
  });
};

//Upload Image
export const uploadFile = (image, postId) => {
  let formData = new FormData();
  formData.append("image", image);
  return privateAxios
    .post(`/posts/image/upload/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

//Get Posts By Category!
export function getPostByCategory(categoryId) {
  return myAxios
    .get(`/category/${categoryId}/posts`)
    .then((response) => response.data);
}

export function updateUserPost(post, postId) {
  return privateAxios
    .put(`/posts/${postId}`, post)
    .then((response) => response.data);
}

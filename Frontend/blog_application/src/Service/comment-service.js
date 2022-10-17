import { privateAxios } from "./AxiosHelper.js";

export const createComment = (commentData, userId, postId) => {
  return privateAxios
    .post(`/user/${userId}/post/${postId}/comment`, commentData)
    .then((response) => response.data);
};

export const deleteUserPostComment = (commentID) => {
  return privateAxios
    .delete(`/comment/${commentID}`)
    .then((response) => response.data);
};

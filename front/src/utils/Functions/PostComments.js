import { fetchWrapper } from "./api/api";

export const postComments = (restaurant, token, commentData) => {
  return fetchWrapper({
    endpoint: `/comments/${restaurant}`,
    method: "POST",
    body: commentData,
    token: token,
  });
};

import axiosInstance from "../axios/axiosInstance";

export const reactionEmoji = {
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
};

export const fetchSinglePost = async (axios, postId) => {
  try {
    const token = localStorage.getItem("token");
    if(!token) throw new Error("You are not authorized")
    const fetchPost = await axios.get(`post/single-post/${postId}`, {
      headers: { Authorization: "Bearer " + token }
    });
    if (fetchPost.data.statusText === "OK") {
      const restructuredPost = {
        data: { id: postId, ...fetchPost.data.post },
        statusText: fetchPost.data.statusText,
      };
      return restructuredPost;
    }
    throw new Error("No Post Found with the Specified postId");
  } catch (err) {
    throw new Error(err);
  }
};

export const createAndSignInUser = async (email, fullName) => {
  try {
    const user = await axiosInstance.post("signInUser", {
      email: email,
      fullName: fullName,
    });
    return user.data;
  } catch (err) {
    throw err;
  }
};


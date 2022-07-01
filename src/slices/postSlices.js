import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axiosInstance";
import { reactionEmoji } from "../utils/helperFunction";

export const updateSinglePost = createAsyncThunk(
  "posts/updateSinglePost",
  async ({ postId, postInfo }, { rejectWithValue, getState }) => {
    try {
      const token = getState().users.token || localStorage.getItem("storage");
      if (!token) throw new Error("Your are not authorized!");
      const updatePost = await axios.patch(
        `post/edit-post/${postId}`,
        postInfo,
        { headers: { Authorization: "Bearer " + token } }
      );
      return {
        id: postId,
        updateResponse: updatePost.data.post,
        statusText: "OK",
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updatePostReactions = createAsyncThunk(
  "posts/updatePostReactions",
  async ({ postId, postReaction, reactionCount }, { getState }) => {
    const token = getState().users.token || localStorage.getItem("token");
    if (!token) throw new Error("Your are not authorized");
    const updateReaction = await axios.patch(
      `post/post-reaction/${postId}/`,
      {
        [postReaction]: reactionCount,
      },
      { headers: { Authorization: "Bearer " + token } }
    );
    return {
      id: postId,
      updatedResponse: updateReaction.data.post,
      statusText: "OK",
    };
  }
);

export const deleteSinglePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { getState }) => {
    const token = getState().users.token || localStorage.getItem("token");
    if (!token) throw new Error("You are not authorized");
    const deleteResponse = await axios.delete(`post/delete-post/${postId}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return { id: postId, status: deleteResponse.data.statusText };
  }
);

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("token") || getState.users.token;
      if (!token) throw new Error("Your are not Authorized");
      initialPost.reactions = reactionEmoji;
      const response = await axios.post("post/create-post", initialPost, {
        headers: { Authorization: "Bearer " + token },
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue({ message: err.response.data.message });
    }
  }
);

export const fetchAllPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("You are not authorized");
  const response = await axios.get("post/all-posts", {
    headers: { Authorization: "Bearer " + token },
  });
  return response.data.posts;
});

const initialPost = {
  allPosts: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState: initialPost,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addNewPost.fulfilled, (state, { payload }) => {
      state.allPosts.push(payload);
    });

    //builder for fetching posts
    builder.addCase(fetchAllPosts.fulfilled, (state, { payload }) => {
      const restructuredPost = payload.map((post) => {
        return {
          id: post._id,
          ...post,
        };
      });
      state.allPosts = restructuredPost;
    });

    //builder for deleting singling post
    builder.addCase(deleteSinglePost.fulfilled, (state, { payload }) => {
      state.allPosts = state.allPosts.filter(
        (post) => post.id !== payload.postId
      );
    });

    //builder for updating postReactions
    builder.addCase(updatePostReactions.fulfilled, (state, { payload }) => {
      const singlePostIndex = state.allPosts.findIndex(
        (post) => post._id === payload.id
      );
      payload.updatedResponse.id = payload.id;
      if (singlePostIndex > -1) {
        state.allPosts[singlePostIndex] = payload.updatedResponse;
      }
    });

    //builders for updating a single Post
    builder.addCase(updateSinglePost.fulfilled, (state, { payload }) => {
      const singlePost = state.allPosts.find((post) => post.id === payload.id);
      if (singlePost) {
        for (const key in payload.updateResponse) {
          singlePost[key] = payload.updateResponse[key];
        }
      }
    });
  },
});

export const { deletePost, postUpdated } = postSlice.actions;

export default postSlice.reducer;

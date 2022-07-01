import React, { Component } from "react";
import { connect } from "react-redux";

import openConnection from "socket.io-client";

import { fetchAllPosts, updatePostReactions } from "../../../slices/postSlices";

import withRouter from "../../../hoc/WithRouter";
import { unwrapResult } from "@reduxjs/toolkit";
import PostArticle from "../../../components/posts/features/PostArticle";
import { fetchSinglePost } from "../../../utils/helperFunction";

import axios from "../../../axios/axiosInstance";
import DisplayAuth from "../../Auth/DisplayAuth";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "idle",
    };
  }
  componentDidMount() {
    const fetchPosts = async () => {
      try {
        this.setState({ status: "loading" });
        const response = await this.props.fetchAllPosts();
        unwrapResult(response);
        this.setState({ status: "succeeded" });
      } catch (err) {
        console.log(err);
        this.setState({ status: "idle" });
      }
    };
    fetchPosts();
    /* const socket = openConnection("http://localhost:8080");
    socket.on("hello", (data) => {
      console.log(data)
    });
    socket.emit("message", "User is typing!!")
    socket.on("message", (data) => {
      console.log(data)
    }) */
  }

  handleUpdatePostReactions = async (post, name) => {
    try {
      const fetchPostBeforeUpdate = await fetchSinglePost(axios, post.id);
      if (fetchPostBeforeUpdate.statusText !== "OK") {
        return;
      }
      const updateSinglePostReaction = await this.props.updatePostReactions({
        postId: post.id,
        postReaction: name,
        reactionCount: fetchPostBeforeUpdate.data.reactions[name] + 1,
      });
      unwrapResult(updateSinglePostReaction);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    let initialPost;

    if (this.state.status === "loading") {
      initialPost = <p>Posts Loading...</p>;
    } else if (this.state.status === "succeeded") {
      initialPost = this.props.posts.map((post) => (
        <PostArticle
          key={post.id}
          post={post}
          updatePostReaction={this.handleUpdatePostReactions}
        />
      ));
    } else if (this.state.status === "idle") {
      initialPost = (
        <h3 className="text-2xl">No Post Found! Start Entering Post</h3>
      );
    }

    return (
      <section>
        <DisplayAuth signOut={this.props.onSignOut} />
        <h2 className="text-2xl font-semibold text-slate-700 mb-5">Posts</h2>
        {initialPost}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.allPosts,
  user: state.users,
});

const mapDispatchToProps = () => ({
  fetchAllPosts,
  updatePostReactions,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(withRouter(PostList));

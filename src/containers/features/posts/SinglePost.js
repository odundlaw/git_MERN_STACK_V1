import React, { Component } from "react";
import { connect } from "react-redux";

import {
  deleteSinglePost,
  updatePostReactions,
} from "../../../slices/postSlices";

import withRouter from "../../../hoc/WithRouter";
import Post from "../../../components/posts/features/SinglePost";
import { unwrapResult } from "@reduxjs/toolkit";

import axios from "../../../axios/axiosInstance";
import { fetchSinglePost } from "../../../utils/helperFunction";

class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
    };
  }

  componentDidMount() {
    const { postId } = this.props.params;
    fetchSinglePost(axios, postId)
      .then(({ data }) => {
        this.setState({ post: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleDeletePost = async (id) => {
    const deletePost = await this.props.deleteSinglePost(id);
    unwrapResult(deletePost);
    this.props.navigate("/");
  };

  handleUpdatePostReactions = async (post, name) => {
    try {
      const fetchPostBeforeUpdate = await fetchSinglePost(axios, post._id);
      if (fetchPostBeforeUpdate.statusText !== "OK") {
        return;
      }
      const update = await this.props.updatePostReactions({
        postId: post._id,
        postReaction: name,
        reactionCount: fetchPostBeforeUpdate.data.reactions[name] + 1,
      });
      const updatedValue = unwrapResult(update);
      console.log(updatedValue)
      if (updatedValue.statusText === "OK") {
        this.setState({ post: updatedValue.updatedResponse });
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { post } = this.state;
    if (!post) {
      return (
        <section>
          <h3>No Post Found!</h3>
        </section>
      );
    }

    return (
      <Post
        post={post}
        deletePost={this.handleDeletePost}
        updatePostReaction={this.handleUpdatePostReactions}
      />
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = () => ({
  deleteSinglePost,
  updatePostReactions,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(withRouter(SinglePost));

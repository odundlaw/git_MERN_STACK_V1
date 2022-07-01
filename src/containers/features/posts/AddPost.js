import React, { Component } from "react";
import { connect } from "react-redux";

import { addNewPost, updateSinglePost } from "../../../slices/postSlices";
import withRouter from "../../../hoc/WithRouter";
import { unwrapResult } from "@reduxjs/toolkit";
import DisplayAuth from "../../Auth/DisplayAuth";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      userId: "",
      content: "",
      editPostId: "",
      submitting: false,
      isEditing: false,
      error: "",
    };
  }

  componentDidMount() {
    const { postId } = this.props.params;
    const searchParams = this.props.location.search;
    const isEditing = new URLSearchParams(searchParams).get("editing");

    const singlePost = this.props.posts.find((post) => post.id === postId);
    if (singlePost && isEditing) {
      this.setState({
        title: singlePost.title,
        content: singlePost.content,
        isEditing: isEditing,
        userId: singlePost.user._id,
        editPostId: singlePost.id,
      });
    }
  }

  inputChangeHandler = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmitPost = (event) => {
    event.preventDefault();

    const { title, content, userId } = this.state;
    const isValid = Boolean(title) && Boolean(content) && Boolean(userId);

    if (!isValid) {
      return;
    }
    const handleSubmitFunction = async () => {
      if (isValid) {
        try {
          this.setState({ submitting: true });
          const resultAction = await this.props.addNewPost({
            title,
            content,
            user: userId,
          });
          unwrapResult(resultAction);
          this.setState({ title: "", content: "", userId: "" });
          this.props.navigate("/");
        } catch (err) {
          this.setState({ error: err.message });
          console.log(err);
        } finally {
          this.setState({ submitting: false });
        }
      }
    };

    handleSubmitFunction();
  };

  handleSubmitEditPost = (event) => {
    event.preventDefault();

    const { title, content, userId, editPostId } = this.state;
    const isValid = Boolean(title) && Boolean(content) && Boolean(userId);

    const handleEditFunction = async () => {
      if (isValid) {
        try {
          this.setState({ submitting: true });
          const resultAction = await this.props.updateSinglePost({
            postId: editPostId,
            postInfo: { title, content, user: userId },
          });
          unwrapResult(resultAction);
          this.setState({
            title: "",
            content: "",
            userId: "",
            editPostId: "",
            isEditing: "false",
          });
          this.props.navigate(`/posts/post/${editPostId}`);
        } catch (err) {
          this.setState({ error: err.message });
          console.log(err);
        } finally {
          this.setState({ submitting: false });
        }
      }
    };
    handleEditFunction();
  };

  render() {
    return (
      <>
        <DisplayAuth signOut={this.props.onSignOut} />
        <div className="flex flex-col w-full justify-center items-center space-y-4">
          <h3 className="text-2xl font-semibold text-slate-700 mb-5">
            {this.state.isEditing ? "Edit Post Form" : "Add Post Form"}
          </h3>
          {this.state.error && (
            <span className="p-2 w-[50%] bg-red-200 text-white text-sm rounded-sm text-center cursor-pointer border border-red-400">
              {this.state.error}
              <button
                className="text-black float-right text-lg"
                onClick={() => this.setState({ error: "" })}
              >
                x
              </button>
            </span>
          )}
          <form className="flex flex-col w-[50%] justify-center space-y-3.5">
            <div className="flex flex-col space-y-1">
              <label htmlFor="postTitle" className="text-slate-600">
                Post Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={this.state.title}
                onChange={this.inputChangeHandler}
                className="p-1 border border-slate-400 ring-0 outline-none rounded-sm"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="postUser" className="text-slate-600">
                Post Author:
              </label>
              <select
                name="userId"
                id="userId"
                value={this.state.userId}
                onChange={this.inputChangeHandler}
                className="p-1.5 border border-slate-400 ring-0 outline-none rounded-sm text-sm bg-slate-50 space-y-2"
                disabled={
                  Boolean(this.state.isEditing) && Boolean(this.state.userId)
                }
              >
                <option value="">--Select User--</option>
                <option
                  value={this.props.users.userId?.toString()}
                  key={this.props.users.userId?.toString()}
                >
                  {this.props.users.fullName}
                </option>
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="postContent" className="text-slate-600">
                Post Content:
              </label>
              <textarea
                id="content"
                name="content"
                value={this.state.content}
                onChange={this.inputChangeHandler}
                className="pb-6 px-1 py-5 border border-slate-400 ring-0 outline-none rounded-sm"
              />
              {this.state.isEditing && (
                <input
                  type="hidden"
                  value={this.state.editPostId}
                  id="postId"
                  name="postId"
                />
              )}
            </div>
            <button
              type="submit"
              onClick={
                this.state.isEditing
                  ? this.handleSubmitEditPost
                  : this.handleSubmitPost
              }
              className="p-2 rounded-full bg-purple-500 text-white hover:bg-purple-400 transition-all"
              disabled={this.state.submitting}
            >
              {this.state.submitting ? "Saving post..." : "Save Post"}
            </button>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.allPosts,
  users: state.users,
});

const mapDispatchToProps = () => ({
  updateSinglePost,
  addNewPost,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(withRouter(AddPost));

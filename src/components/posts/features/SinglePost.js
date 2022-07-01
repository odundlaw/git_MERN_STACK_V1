import React from "react";
import PostAuthor from "../../../containers/features/posts/PostAuthor";
import ReactionButton from "../../../containers/features/posts/ReactionButton";
import TimeAgo from "../../../containers/features/posts/TimeAgo";
import withRouter from "../../../hoc/WithRouter";

const Post = ({ post, navigate, deletePost, updatePostReaction }) => {
  return (
    <section>
      <article className="space-y-2">
        <h3 className="text-2xl sm:3xl first-letter:uppercase">{post.title}</h3>
        <p className="text-md sm:text-lg text-slate-500">{post.content}</p>
        <div className="flex flex-col items-start space-y-3 w-[100%] sm:flex sm:flex-row sm:items-end sm:justify-between sm:space-x-3">
          <div>
            {" "}
            <PostAuthor author={post.user} />
            <TimeAgo timestamp={post.createdAt} />
          </div>
          <ReactionButton post={post} updatePostReaction={updatePostReaction} />
          <div className="flex items-end justify-end space-x-3">
            <button
              className="p-2 bg-green-400 rounded-md text-white text-sm"
              onClick={() => navigate(`/addPost/${post.id}?editing=true`)}
            >
              Edit Post
            </button>
            <button
              className="p-2 bg-red-400 rounded-md text-white text-sm"
              onClick={() => deletePost(post.id)}
            >
              Delete Post
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default withRouter(Post);

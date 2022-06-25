import React from "react";
import PostAuthor from "../../../containers/features/posts/PostAuthor";
import ReactionButton from "../../../containers/features/posts/ReactionButton";
import TimeAgo from "../../../containers/features/posts/TimeAgo";
import withRouter from "../../../hoc/WithRouter";

const PostArticle = ({ post, navigate, updatePostReaction }) => {
  return (
    <article className="border border-slate-300 rounded-md pr-6 pl-6 pb-4 pt-2 mb-4 space-y-1">
      <h3 className="text-xl my-2 first-letter:uppercase">{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <div className="flex w-[100%] items-end justify-between space-x-3">
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <ReactionButton post={post} updatePostReaction={updatePostReaction} />
        <button
          className="p-2 bg-green-400 rounded-md text-white text-sm"
          onClick={() => navigate(`/posts/post/${post._id}`)}
        >
          View Post
        </button>
      </div>
    </article>
  );
};

export default withRouter(PostArticle);

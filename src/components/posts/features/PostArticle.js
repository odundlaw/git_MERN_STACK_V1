import React from "react";
import PostAuthor from "../../../containers/features/posts/PostAuthor";
import ReactionButton from "../../../containers/features/posts/ReactionButton";
import TimeAgo from "../../../containers/features/posts/TimeAgo";
import withRouter from "../../../hoc/WithRouter";

const PostArticle = ({ post, navigate, updatePostReaction }) => {
  return (
    <article className="border border-slate-300 rounded-md pr-6 pl-6 pb-4 pt-2 mb-4 space-y-1">
      <h3 className="text-lg sm:text-xl my-2 first-letter:uppercase">{post.title}</h3>
      <p className="text-sm sm:text-[16px]">{post.content.substring(0, 100)}</p>
      <div className="flex flex-col items-start sm:flex sm:flex-row w-[100%] sm:items-end sm:justify-between justify-center sm:space-x-3 space-x-0 space-y-3">
        <div>
          <PostAuthor author={post.user} />
          <TimeAgo timestamp={post.createdAt} />
        </div>
        <ReactionButton post={post} updatePostReaction={updatePostReaction} />
        <button
          className="p-2 bg-green-400 rounded-md text-white text-sm max-w-xs"
          onClick={() => navigate(`/posts/post/${post._id}`)}
        >
          View Post
        </button>
      </div>
    </article>
  );
};

export default withRouter(PostArticle);

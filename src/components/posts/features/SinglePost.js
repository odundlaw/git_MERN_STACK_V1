import React from 'react';
import PostAuthor from '../../../containers/features/posts/PostAuthor';
import ReactionButton from '../../../containers/features/posts/ReactionButton';
import TimeAgo from '../../../containers/features/posts/TimeAgo';
import withRouter from '../../../hoc/WithRouter';

const Post = ({ post, navigate, deletePost, updatePostReaction }) => {
  return (
    <section>
      <article className="space-y-2">
        <h3 className="text-3xl first-letter:uppercase">{post.title}</h3>
        <p className="text-lg text-slate-500">{post.content}</p>
        <div className="flex w-[100%] items-end justify-between space-x-3">
          <div>
            {" "}
            <PostAuthor userId={post.user} />
            <TimeAgo timestamp={post.date} />
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

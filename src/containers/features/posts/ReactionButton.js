import React from "react";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "💖",
  rocket: "🚀",
  eyes: "👀",
};

const ReactionButton = ({ post, updatePostReaction }) => {

  const updateReactions = (post, name) => {
    updatePostReaction(post, name);
  };

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      key={name}
      className="shadow-sm border-slate-100 border p-1 rounded-sm"
      onClick={() => updateReactions(post, name)}
    >
      {" "}
      {emoji} {post.reactions[name]}
    </button>
  ));
  return <div className="flex space-x-1">{reactionButtons}</div>;
};

export default ReactionButton;

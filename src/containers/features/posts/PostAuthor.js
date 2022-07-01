import React from "react";

const PostAuthor = ({ author }) => {

  return (
    <span className="text-sm text-slate-400">
      <span className="text-slate-600 sm:text-sm text-xs">Posted by: </span>
      <span className="capitalize sm:text-sm text-xs">
        {author ? author.fullName.toLowerCase() : "No authour found"}{" "}
      </span>
    </span>
  );
};

export default PostAuthor;

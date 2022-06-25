import React from "react";
import { useSelector } from "react-redux";

const PostAuthor = ({ userId }) => {
  const author = useSelector((state) =>
    state.users.find((user) => user.userId === userId)
  );

  return (
    <span className="text-sm text-slate-400">
      <span className="text-slate-600">Posted by: </span>
      {author ? author.name : "No authour found"}
    </span>
  );
};

export default PostAuthor;

import { formatDistanceToNow, parseISO } from "date-fns";
import React from "react";

const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} Ago`;
  }
  return (
    <span className="text-sm">
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;

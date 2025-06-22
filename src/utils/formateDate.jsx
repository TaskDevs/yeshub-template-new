import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

const TimeAgo = ({ date }) => {
  return <span>{dayjs(date).fromNow()}</span>;
};

export default TimeAgo;

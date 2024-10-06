import { Skeleton } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Skeleton
      variant="rounded"
      animation="wave"
      width={600}
      height={300}
      className="mt-4 rounded-lg"
    />
  );
};

export default Loading;

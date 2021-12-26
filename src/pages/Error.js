import React from "react";
import NotFound from "../assets/notFound.svg";

function Error() {
  return (
    <div>
      <img src={NotFound} alt="404" />
    </div>
  );
}

export default Error;

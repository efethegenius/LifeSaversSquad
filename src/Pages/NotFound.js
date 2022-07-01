import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>PAGE NOT FOUND</h2>
      <Link to="/" className="button">
        Go Back Home
      </Link>
    </div>
  );
};

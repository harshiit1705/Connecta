import React, { useState } from "react";
import PostCard from "../common/PostCard.jsx";

const PostFeed = ({ posts }) => {
  return (
    <section>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
};

export default PostFeed;

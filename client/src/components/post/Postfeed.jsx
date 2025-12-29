import React, { useState} from "react";
import PostCard from "../common/PostCard.jsx";

const PostFeed = ({ posts }) => {
  return (
    <section>
      {posts.map((post) => {
        return <PostCard key={ post._id } post={post} />
})}
    </section>
  );
};



export default PostFeed;

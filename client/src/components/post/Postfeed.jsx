import React, { useState} from "react";
import PostCard from "../common/PostCard.jsx";

const PostFeed = ({ posts, onEdit, onDelete }) => {
  return (
    <section>
      {posts.map((post) => {
        return <PostCard 
        key={ post._id } 
        post={post} 
        onDelete={onDelete}
        onEdit={onEdit}
        />
})}
    </section>
  );
};



export default PostFeed;

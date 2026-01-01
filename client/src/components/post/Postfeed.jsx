import React, { useState} from "react";
import PostCard from "../common/PostCard.jsx";

const PostFeed = ({ posts, onEdit, onDelete, onLike }) => {
  return (
    <section>
      {posts.map((post) => {
        return <PostCard 
        key={ post._id } 
        post={post} 
        onDelete={onDelete}
        onEdit={onEdit}
        onLike={onLike}
        />
})}
    </section>
  );
};



export default PostFeed;

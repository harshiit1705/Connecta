import React from "react";
import "./PostCard.css";

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-header">
        <div className="post-avatar">M</div>
        <div>
          <h4 className="post-author">{post.author}</h4>
          <span className="post-time">{post.time}</span>
        </div>
      </div>

      {/* Content */}
      <div className="post-content">
        <p>{post.content}</p>
      </div>

      {/* Actions */}
      <div className="post-actions">
        <button>Like</button>
        <button>Comment</button>
        <button>Share</button>
      </div>
    </div>
  );
};

export default PostCard;

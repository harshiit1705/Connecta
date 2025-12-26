import React, { useState } from "react";
import "./CreatePost.css";

const CreatePost = ({ onCreate }) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;

    onCreate({
      author: "Neo",
      time: "Just now",
      content
    });
    
    setContent("");
  };

  return (
    <div className="create-post">
      <div className="create-post-top">
        <div className="avatar">N</div>
        <input
          type="text"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="create-post-bottom">
        <button onClick={handleSubmit}>Post</button>
      </div>
    </div>
  );
};

export default CreatePost;

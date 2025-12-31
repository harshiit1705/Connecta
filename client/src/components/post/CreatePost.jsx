import React, { useEffect, useState } from "react";
import "./CreatePost.css";

const CreatePost = ({ onCreate, onUpdate, editingPost, cancelEdit }) => {
  const [content, setContent] = useState("");
  
  useEffect(() => {
    if(editingPost){
      setContent(editingPost.content);
    }
  }, [editingPost]);

  const handleSubmit = () => {
    if(editingPost){
      onUpdate(editingPost._id, content)
    } else{
    onCreate(content);
    }
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
        <button onClick={handleSubmit}>
          {editingPost ? "Update" : "Post"}
        </button>
        {editingPost && (
          <button onClick={cancelEdit}>Cancel</button>
        )}
      </div>
    </div>
  );
};

export default CreatePost;

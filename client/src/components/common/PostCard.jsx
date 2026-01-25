import { useContext, useState } from "react";
import "./PostCard.css";
import { AuthContext } from "../../context/AuthContext.jsx";
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post, onDelete, onEdit, onLike }) => {

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const isOwner = post?.author?._id === user?._id;

  const isLiked = post.likes.includes(user?._id);

  const[comments, setComments] = useState([]);
  const[showComments, setShowComments] = useState(false);
  const [texts, setTexts] = useState("");

  console.log("post's data: ", post);

  const loadComments = async() => {
    const res = await api.get(`/api/v1/posts/${post._id}/comments`);
    setComments(res.data);
    setShowComments(true);
  };

  const handleAddComment = async() => {
    if(!texts.trim()) return;

    const res = await api.post(`/api/v1/posts/${post._id}/comments`,
      {content: texts}
    );

    setComments(prev => [res.data, ...prev]);
    setTexts("");
  }

  const deleteComment = async(commentId) => {
    await api.delete(`/api/v1/comments/${commentId}`);

    setComments(prev => prev.filter(c => c._id !== commentId));
  }
  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-header">
        <img className="post-avatar" 
        src={post.author.avatar?.url || "/default_avatar.png"} 
        alt={post.author.name}/>
        <div>
          <h4 className="post-author" 
          onClick={ () => navigate(`/profile/${post.author._id}`) } >
            {post?.author?.name}
            </h4>
          <span className="post-time">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
        {
          isOwner && (
            <>
              <button onClick={() => onEdit(post)}>Edit</button>
              <button onClick={() => onDelete(post._id)} >Delete</button>
            </>
          )
        }
      </div>

      <div className="post-content">
        <p>{post?.content}</p>
      </div>

      <div className="post-actions">
        <button onClick={() => onLike(post._id, isLiked)}>
          {isLiked ? "Unlike" : "Like"} {post.likes.length}
        </button>

        <button onClick={ loadComments }> Comment {post.commentsCount}</button>
        {
          showComments && (
            <div className="comments-section">
              <div  className="comment-input">
                <input value={texts}
              onChange={e => setTexts(e.target.value)}
              placeholder="Write a comment..."
              />
              <button onClick={handleAddComment}>Send</button>
              </div>

             <div className=".comments-list">
               {comments.map(comment => (
                <div className="comment" key={comment._id}>
                  <strong className=".comment-author">{comment.author.name}</strong>
                  <p className="comment-content">{comment.content}</p>
                  {
                    comment.author._id === user._id && (
                      <button onClick={() => deleteComment(comment._id)}>Delete</button>
                    )
                  }
                </div>
              ))}
             </div>
            </div>
          )
        }
        <button>Share</button>
      </div>
    </div>
  );
};

export default PostCard;

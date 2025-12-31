import { useContext } from "react";
import "./PostCard.css";
import { AuthContext } from "../../context/AuthContext.jsx";

const PostCard = ({ post, onDelete, onEdit }) => {
  const { user } = useContext(AuthContext);

  const isOwner = post?.author?._id === user?._id;

  const isLiked = post.likes.includes(user?._id);

  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-header">
        <div className="post-avatar"></div>
        <div>
          <h4 className="post-author">{post?.author?.name}</h4>
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

      {/* Content */}
      <div className="post-content">
        <p>{post?.content}</p>
      </div>

      {/* Actions */}
      <div className="post-actions">
        <button >Like</button>
        <button>Comment</button>
        <button>Share</button>
      </div>
    </div>
  );
};

export default PostCard;

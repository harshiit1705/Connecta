import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    likes: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
],
  commentsCount: {
    type: Number,
    default: 0
  }
}, 
{ 
    timestamps: true 
}
);

const Post = mongoose.model("Post", postSchema);

export default Post;
import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    author: {
        type: "String",
        required: "true",
        trim: "true"
    },
    content: {
        type: "String",
        required: "true",
        trim: "true"
    }
}, 
{ 
    timestamps: true 
}
);

const Post = mongoose.model("Post", postSchema);

export default Post;
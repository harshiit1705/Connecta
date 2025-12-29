import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Post from "./models/Post.model.js";
import Comment from "./models/Comment.model.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/posts", async(req, res) => {
  try {
    const posts = await Post.find()
    .populate("author", "name avatar")
    .sort({ createdAt: -1});
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts"});
  }
});

app.post("/api/v1/posts", async(req, res) => {
  try {
    const { author, content } = req.body;

    if(!author || !content){
      return res.status(400).json({message: "Author and content are required "});
    }
    const newPost = await Post.create({
      author,
      content
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Post creation failed" });
  }
});

app.post("/api/v1/posts/:id/like", async(req, res)=> {
  try {
    const { userId } = req.body;
  
    await Post.findByIdAndUpdate( req.params.id, 
      {$addToSet: { likes: userId } },
      {new: true }
    );
  
    res.json({ message: "Post likes" });
  } catch (err) {
    res.status(500).json({ message: "Failed to like post" });
  }
});

app.delete("/api/v1/posts/:id/like", async(req, res) => {
  try {
    const { userId } = req.body;
  
    await Post.findByIdAndUpdate( req.params.id, 
      { $pull: {likes: userId }}
    );
  
    res.json({ message: "Post unliked"});
  } catch (error) {
    res.status(500).json({ message: "Failed to unlike post"});
  }
})

app.post("/api/v1/posts/:id/comments", async(req, res) => {
  try {
    const { author, content } = req.body;
  
    const comment = await Comment.create({
      post: req.params.id,
      author,
      content
    });
  
    await Post.findByIdAndUpdate( req.params.id, {
      $inc: {commentsCount: 1}
    });
  
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment"});
  }
});

app.get("/api/v1/posts/:id/comments", async(req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
    .populate("author", "name avatar")
    .sort({ createdAt: -1});
  
    res.json(comments);
  } catch (error) {
    res.status(500).json({message: "Failed to fetch comments"});
  }
})
// app.get("/", (req, res) => {
//   res.send("Backend is running");
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

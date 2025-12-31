import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Post from "./models/Post.model.js";
import Comment from "./models/Comment.model.js";
import authRoutes from "./routes/auth.routes.js";
import authMiddleware from "./middleware/auth.middleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", authRoutes);

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

app.post("/api/v1/posts", authMiddleware, async(req, res) => {
  try {
    const { content } = req.body;

    if(!content){
      return res.status(400).json({message: "Content is required "});
    }
    const newPost = await Post.create({
      author: req.user._id,
      content
    });
    
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Post creation failed" });
  }
});

app.patch("/api/v1/posts/:id", authMiddleware, async(req, res) => {
  try {
    const { content } = req.body;

    const post = await Post.findById(req.params.id);

    if(!post){
      return res.status(404).json({ message: "Post not found" });
    }

    if(post.author.toString() !== req.user._id.toString()){
      return res.status(400).json({ message: "user is not allowed to edit this post." });
    }

    post.content = content;

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to update post!"})
  }
})

app.delete("/api/v1/posts/:id", authMiddleware, async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if(!post){
      return res.status(404).json({ message: "Post not found" });
    }

    if(post.author.toString() !== req.user._id.toString()){
      return res.status(400).json({ message: "user is not allowed to delete this post." });
    }

    await post.deleteOne();

    res.json({ message: "post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post!"})
  }
})

app.post("/api/v1/posts/:id/like", async(req, res)=> {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params._id,
      {$addToSet: {likes: req.user._id}},
      {new: true}
    );

    if(!post){
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to like post" });
  }
});

app.delete("/api/v1/posts/:id/like", async(req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {$pull: {likes: req.user._id }},
      { new: true}
    );

    if(!post){
      return res.status(404).json({ message: "Post not found"});
    };
    res.json(post);
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

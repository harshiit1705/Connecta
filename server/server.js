import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Post from "./models/Post.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/posts", async(req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1});
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts"});
  }
});

app.post("/api/v1/posts", async(req, res) => {
  try {
    const { author, content } = req.body;
  
    const newPost = await Post.create({
      author,
      content
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Post creation failed" });
  }
});

// app.get("/", (req, res) => {
//   res.send("Backend is running");
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

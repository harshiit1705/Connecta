import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const posts = [
  {
    id: "p_89012",
    author: "Harshit Sharma",
    content: "Just finished building my first full-stack project.",
    time: "Just now"
  },
  {
    id: "p_89013",
    author: "Aman Verma",
    content: "Morning workout done.",
    time: "2h"
  }
];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/posts", (req, res) => {
  res.json(posts);
});
app.post("/api/v1/posts", (req, res) => {
  const { author, content, time } = req.body;
  const newPost = {
    id : `p_${Date.now()}`, 
    author, 
    content, 
    time 
  };
  res.status(201).json(newPost);
  posts.unshift(newPost);
});

// app.get("/", (req, res) => {
//   res.send("Backend is running");
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

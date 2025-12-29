import authMiddleware from "../middleware/auth.middleware.js";
import AuthMiddleware from "../middleware/auth.middleware.js";
import express from "express";
import Post from "../models/User.model.js";

const router = express.Router();

router.post("/api/v1/posts", 
    authMiddleware,
    async(req, res) => {
        try {
            const { content } = req.body;

            const newPost = await Post.create({
                author: req.user._id,
                content 
            });
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({ message: "Post creation failed" })
        }
    }
);
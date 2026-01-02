import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {getUserProfile, 
    getUserPosts, 
    updateProfile, 
    followUser, 
    unFollowUser
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:id", getUserProfile);
router.get("/:id/posts", getUserPosts);
router.patch("/me", authMiddleware, updateProfile);
router.post("/:id/follow", authMiddleware, followUser);
router.delete("/:id/follow", authMiddleware, unFollowUser);

export default router;
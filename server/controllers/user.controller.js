import User from "../models/User.model.js";
import Post from "../models/Post.model.js";

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select("-password")
            .populate("followers following", "name, avatar");

        if (!user) {
           return res.status(404).json({ message: "user not found" });
        }

        return res.status(200).json(user);
    }
    catch (error) {
        console.log("error while loading profile ", error);
        res.status(500).json({ message: "Failed to get profile" })
    }
}

const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.params.id })
            .populate("author", "name avatar")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    }
    catch (error) {
        console.log("error while loading posts ", error);
        res.status(500).json({ message: "Failed to get Posts" })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { name, bio, avatar } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, bio, avatar },
            { new: true }
        ).select("-password");

        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Profile update failed!" })
    }
}

const followUser = async (req, res) => {
    try {
        if (req.params.id === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        };

        await User.findByIdAndUpdate(req.params.id, {
            $addToSet: { followers: req.user._id }
        });

        await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { following: req.params.id }
        });

        res.status(200).json({ message: "User followed" })
    }
    catch (error) {
        res.status(500).json({ message: "Failed to follow user!" })
    }
}

const unFollowUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {
            $pull: { followers: req.user._id }
        });
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.params.id }
        });

        res.status(200).json({ message: "User unfollowed." })
    }
    catch (error) {
        res.status(500).json({ message: "Failed to unfollow user!" })
    }
}

export  { getUserProfile, getUserPosts, updateProfile, followUser, unFollowUser }
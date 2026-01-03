import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { generateTokens } from "../utils/generateTokens.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User is already register" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const { accessToken, refreshToken } = generateTokens(user._id);

        res
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: false
            })
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: false
            })
            .status(201).json({
                id: user._id,
                name: user.name,
                email: user.email
            });
    } catch (e) {
        res.status(500).json({ message: "Signup failed!" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const { accessToken, refreshToken } = generateTokens(user._id);

        res
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "lax",
                secure: false
            })
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                sameSite: "lax",
                secure: false
            })
            .status(200)
            .json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
    } catch (error) {
        res.status(500).json({ message: "Login Failed" });
    }
});

router.post("/refresh", (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token" });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const accessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: false
        });

        res.json({ message: "Access token refreshed" });
    } catch (error) {
        res.status(403).json({ message: "Invalid refresh token" });
    }
});

router.post("/logout", (req, res) => {
    res
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json({ message: "logged out" })
});

router.get("/me", authMiddleware, (req, res) => {
    res.status(200).json({
        user: req.user
    });
});

export default router;
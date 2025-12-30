import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async(req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if(!name || !email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }
    
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(409).json({ message: "User is already register" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
    
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (e) {
        res.status(500).json({ message: "Signup failed!"});
    }
});

router.post("/login", async(req, res)=> {
    try{
        const { email, password } = req.body

        if(!email || !password){
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await User.findOne({ email }).select("+password");
        if(!user){
            res.status(401).json({ message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch(error){
        res.status(500).json({ message: "Login Failed" });
    }
});

export default router;
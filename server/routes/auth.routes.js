import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";

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
        })
    } catch (e) {
        res.status(500).json({ message: "Signup failed!"});
    }
});

export default router;
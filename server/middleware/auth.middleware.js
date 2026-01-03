import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const authMiddleware = async(req, res, next) => {
    try {
        
        const accessToken = req.cookies.accessToken;

        if(!accessToken){
            return res.status(401).json({ message: "Not authenticated" });
        }

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({ message: "User not found" });
        }
        
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalid or expired" });
    }
};

export default authMiddleware;
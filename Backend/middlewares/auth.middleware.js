import userModel from "../models/user.model.js";
import bcrpt from "bcrypt";
import jwt from "jsonwebtoken";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Token is blacklisted" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized access" });        
    }
};
import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

// Authentication Middleware
export const isAuthenticated = async (req, res, next) => {
  try {
   
    let token = req.header("Auth")
    if (!token) {
      return res.status(401).json({ message: "Login first", success: false });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User not found", success: false });
    }

    req.user = user; // attach user to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", success: false });
  }
};

// Role Authorization Middleware
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied", success: false });
    }
    next();
  };
};

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model.js";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      res.status(401).json({
        error: "Unauthorized",
        message: "You need to be logged in to access this route",
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded || typeof decoded === "string") {
      res.status(401).json({
        error: "Unauthorized",
        message: "Invalid token",
      });
      return;
    }

    const user = await User.findById(decoded.userId).select("password");

    if (!user) {
      res.status(404).json({
        error: "Not Found",
        message: "No user found with this id",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware");
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while protecting the route",
    });
  }
};

export default protectRoute;

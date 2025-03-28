import { Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

function generateToken(userId: mongoose.Types.ObjectId, res: Response) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "15d",
  });

  res.cookie("auth_token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevents XSS cross-site scripting attacks
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production", // CSRF attacks cross-site request forgery
  });

  return token;
}

export default generateToken;

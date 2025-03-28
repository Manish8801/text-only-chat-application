import { Request, Response } from "express";
import User from "../models/user.model.js";
import validateUser from "../lib/validateUser.js";
import { compare, genSalt, hash } from "bcryptjs";
import generateToken from "../lib/generateToken.js";

type TRouteHandler = (req: Request, res: Response) => Promise<void>;

const signup: TRouteHandler = async (req, res) => {
  try {
    const { error, message, validUser } = validateUser(req.body);

    if (error) {
      res.status(400).json({
        error,
        message,
      });

      return;
    }

    if (validUser) {
      const { password } = validUser;
      const salt = await genSalt(12);
      const hashedPassword = await hash(password, salt);

      validUser.password = hashedPassword;
    }

    const user = await User.create(validUser);

    generateToken(user._id, res);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if ((error as any).code === 11000) {
      res.status(400).json({
        error: "duplicate key",
        message: "Username already exists. Please choose another username.",
      });

      return;
    }

    console.log("Error in signup controller.");
    console.log((error as any).message);
    res.status(500).json({
      error: "server error",
      message: "An error occurred while creating the user.",
    });
  }
};

const login: TRouteHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      res.status(400).json({
        error: "invalid user",
        message: "Invalid username or password",
      });

      return;
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).json({
        error: "invalid password",
        message: "Invalid username or password",
      });

      return;
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller.");

    res.status(500).json({
      error: "server error",
      message: "An error occurred while logging in.",
    });
  }
};

const logout: TRouteHandler = async (_, res) => {
  try {
    res.cookie("auth_token", "", { maxAge: 0 });
    res.status(200).json({ message: "User logged out successfully." });
  } catch (error) {
    console.log("Error in logout controller.");

    res.status(500).json({
      error: "server error",
      message: "An error occurred while logging out.",
    });
  }
};

export { signup, login, logout };

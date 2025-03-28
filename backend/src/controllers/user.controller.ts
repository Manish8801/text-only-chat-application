import { Request, Response } from "express";
import User from "../models/user.model.js";

type TRouteHandler = (req: Request, res: Response) => Promise<void>;

const getUsersForSidebar: TRouteHandler = async (req, res) => {
  try {
    const userId = req.user!._id;

    const users = await User.find({ _id: { $ne: userId } }).select("-password");

    res.status(200).json({ users });
  } catch (eror) {
    console.log("Error in getUsersForSidebar controller");
    res.status(500).json({
      error: "server error",
      message: "An internal server error occurred",
    });
  }
};

export { getUsersForSidebar };

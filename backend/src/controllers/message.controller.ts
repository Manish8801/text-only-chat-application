import { Request, Response } from "express";
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

type TRouteHandler = (req: Request, res: Response) => Promise<void>;

const sendMessage: TRouteHandler = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user!._id;
    let chat = await Chat.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = await Chat.create({
        members: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      chat.messages.push(newMessage._id);
      await chat.save();
    }
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log("Error in sendMessage controller");
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while sending the message",
    });
  }
};

const getMessages: TRouteHandler = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    const chat = await Chat.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!chat) {
      res.status(200).json({ messages: [] });
      return;
    }

    res.status(200).json({ messages : chat.messages });
  } catch (error) {
    console.log("Error in getMessages controller");
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while fetching the messages",
    });
  }
};
export { sendMessage, getMessages };

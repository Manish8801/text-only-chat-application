var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import { getReceiverId, io } from "../socket/socket.js";
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        let chat = yield Chat.findOne({
            members: { $all: [senderId, receiverId] },
        });
        if (!chat) {
            chat = yield Chat.create({
                members: [senderId, receiverId],
            });
        }
        const newMessage = yield Message.create({
            senderId,
            receiverId,
            message,
        });
        if (newMessage) {
            chat.messages.push(newMessage._id);
            yield chat.save();
        }
        const receiverSocketId = getReceiverId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receiveMessage", newMessage);
        }
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("Error in sendMessage controller");
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while sending the message",
        });
    }
});
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id: receiverId } = req.params;
        const senderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const chat = yield Chat.findOne({
            members: { $all: [senderId, receiverId] },
        }).populate("messages");
        if (!chat) {
            res.status(200).json({ messages: [] });
            return;
        }
        res.status(200).json({ messages: chat.messages });
    }
    catch (error) {
        console.log("Error in getMessages controller");
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while fetching the messages",
        });
    }
});
export { sendMessage, getMessages };

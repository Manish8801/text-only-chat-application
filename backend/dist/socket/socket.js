import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();
const server = http.createServer(app);
// {userId : socketId}
const userSocketMap = {};
const io = new Server(server, {
  cors: {
    origin: ["https://text-only-chat-application-4.onrender.com"],
    methods: ["GET", "POST"],
  },
});
const getReceiverId = (receiverId) => {
    return userSocketMap[receiverId];
};
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});
export { app, io, server, getReceiverId };

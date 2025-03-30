import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import connectDB from "./config/db.config.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
import path from "path";

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));;
});

server.listen(PORT, () => {
  connectDB();
});

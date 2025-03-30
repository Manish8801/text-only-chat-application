import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import connectDB from "./config/db.config.js";
import cookieParser from "cookie-parser";
import { app, server} from "./socket/socket.js";

const PORT = process.env.PORT || 5000;


// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  console.log("Server is running on port : ", PORT);
  connectDB();
});

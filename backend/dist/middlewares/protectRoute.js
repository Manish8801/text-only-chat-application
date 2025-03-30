var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const protectRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.auth_token;
        if (!token) {
            res.status(401).json({
                error: "Unauthorized",
                message: "You need to be logged in to access this route",
            });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || typeof decoded === "string") {
            res.status(401).json({
                error: "Unauthorized",
                message: "Invalid token",
            });
            return;
        }
        const user = yield User.findById(decoded.userId).select("password");
        if (!user) {
            res.status(404).json({
                error: "Not Found",
                message: "No user found with this id",
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log("Error in protectRoute middleware");
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while protecting the route",
        });
    }
});
export default protectRoute;

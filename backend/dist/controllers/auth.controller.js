var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/user.model.js";
import validateUser from "../lib/validateUser.js";
import { compare, genSalt, hash } from "bcryptjs";
import generateToken from "../lib/generateToken.js";
import formatNameArr from "../utils/formatNameArr.js";
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const { fullname, password } = validUser;
            const salt = yield genSalt(12);
            const hashedPassword = yield hash(password, salt);
            validUser.password = hashedPassword;
            validUser.fullname = fullname.toLowerCase();
            const user = yield User.create(validUser);
            generateToken(user._id, res);
            const { _id, username, profilePic } = user;
            res.status(201).json({
                _id,
                fullname: formatNameArr(fullname).join(" "),
                username,
                profilePic,
            });
        }
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                error: "duplicate key",
                message: "Username already exists. Please choose another username.",
            });
            return;
        }
        console.log("Error in signup controller.");
        console.log(error.message);
        res.status(500).json({
            error: "server error",
            message: "An error occurred while creating the user.",
        });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield User.findOne({ username });
        if (!user) {
            res.status(400).json({
                error: "invalid user",
                message: "Invalid username or password",
            });
            return;
        }
        const isPasswordCorrect = yield compare(password, user.password);
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
    }
    catch (error) {
        console.log("Error in login controller.");
        res.status(500).json({
            error: "server error",
            message: "An error occurred while logging in.",
        });
    }
});
const logout = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("auth_token", "", { maxAge: 0 });
        res.status(200).json({ message: "User logged out successfully." });
    }
    catch (error) {
        console.log("Error in logout controller.");
        res.status(500).json({
            error: "server error",
            message: "An error occurred while logging out.",
        });
    }
});
export { signup, login, logout };

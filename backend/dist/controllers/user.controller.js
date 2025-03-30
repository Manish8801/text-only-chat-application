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
const getUsersForSidebar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const users = yield User.find({ _id: { $ne: userId } }).select("-password");
        ;
        res.status(200).json({ users });
    }
    catch (eror) {
        console.log("Error in getUsersForSidebar controller");
        res.status(500).json({
            error: "server error",
            message: "An internal server error occurred",
        });
    }
});
export { getUsersForSidebar };

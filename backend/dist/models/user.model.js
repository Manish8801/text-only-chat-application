import { model, Schema } from "mongoose";
const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 164,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"],
    },
    profilePic: {
        type: String,
        default: "",
    },
}, { timestamps: true });
const User = model("User", userSchema);
export default User;

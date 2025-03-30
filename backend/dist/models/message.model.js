import { Schema, model } from "mongoose";
const messageShema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Message = model("Message", messageShema);
export default Message;

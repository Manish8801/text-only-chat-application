import { Schema, model, Types } from "mongoose";
const chatSchema = new Schema({
    members: [
        {
            type: Types.ObjectId,
            ref: "User",
        },
    ],
    messages: [
        {
            type: Types.ObjectId,
            ref: "Message",
            default: [],
        },
    ],
}, { timestamps: true });
const Chat = model("Chat", chatSchema);
export default Chat;

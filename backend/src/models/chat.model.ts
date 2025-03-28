import { Schema, model, Types } from "mongoose";

export interface IChat {
  _id: Types.ObjectId;
  members: Types.ObjectId[];
  messages: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const chatSchema = new Schema<IChat>(
  {
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
  },
  { timestamps: true }
);

const Chat = model("Chat", chatSchema);

export default Chat;

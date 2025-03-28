import { model, Schema, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  fullname: string;
  username: string;
  password: string;
  gender: "male" | "female" | "other";
  imageURL?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;

import { ISignUserInfo } from "../types/SignUserInfo.type.js";
import formatName from "../utils/formatNameArr.js";
import getAvatar from "./getAvatar.js";

function validateUser(userInfo: ISignUserInfo) {
  const { fullname, username, password, confirmPassword, gender, imageURL } =
    userInfo;

  if (!fullname || !username || !gender || !password || !confirmPassword) {
    return {
      error: "missing required fields",
      message: "Please ensure all mandatory fields are provided.",
    };
  }

  if (fullname.length < 3) {
    return {
      error: "fullname too short",
      message: "Fullname must be at least 3 characters long.",
    };
  }

  if (!["male", "female", "other"].includes(gender)) {
    return {
      error: "invalid gender",
      message: "Please select a valid gender.",
    };
  }

  if (password.length < 8) {
    return {
      error: "password too short",
      message: "Password must be at least 8 characters long.",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "password mismatch",
      message: "Password and Confirm Password must match.",
    };
  }

  const profilePic = imageURL || getAvatar(gender, fullname);

  return {
    validUser: {
      fullname: formatName(fullname).join(" "),
      username,
      password,
      gender,
      profilePic,
    },
  };
}

export default validateUser;

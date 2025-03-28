import formatName from "../utils/formatNameArr.js";


const BASE_URL = "https://avatar.iran.liara.run";
const MALE_AVATAR = BASE_URL + "/public/boy";
const FEMALE_AVATAR = BASE_URL + "/public/girl";
const AVATAR_BY_NAME = BASE_URL + "/username?username=";

function getAvatar(gender: string, fullname: string) {
  if (gender === "other") {
    const name = formatName(fullname);

    return name.length > 1
      ? AVATAR_BY_NAME + `${name[0]}+${name[1]}`
      : AVATAR_BY_NAME + `${name[0]}&length=1`;
  }

  return gender === "male" ? MALE_AVATAR : FEMALE_AVATAR;
}

export default getAvatar;

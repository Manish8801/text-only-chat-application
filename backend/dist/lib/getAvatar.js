import formatName from "../utils/formatNameArr.js";
function getRandomNum(from, upto) {
    return from + Math.floor(Math.random() * (upto - from + 1));
}
const BASE_URL = "https://avatar.iran.liara.run";
const MALE_AVATAR = BASE_URL + "/public/" + getRandomNum(1, 50);
const FEMALE_AVATAR = BASE_URL + "/public/" + getRandomNum(50, 100);
const AVATAR_BY_NAME = BASE_URL + "/username?username=";
function getAvatar(gender, fullname) {
    if (gender === "other") {
        const name = formatName(fullname);
        return name.length > 1
            ? AVATAR_BY_NAME + `${name[0]}+${name[1]}`
            : AVATAR_BY_NAME + `${name[0]}&length=1`;
    }
    return gender === "male" ? MALE_AVATAR : FEMALE_AVATAR;
}
export default getAvatar;

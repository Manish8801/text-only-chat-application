import jwt from "jsonwebtoken";
function generateToken(userId, res) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });
    res.cookie("auth_token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevents XSS cross-site scripting attacks
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // CSRF attacks cross-site request forgery
    });
    return token;
}
export default generateToken;

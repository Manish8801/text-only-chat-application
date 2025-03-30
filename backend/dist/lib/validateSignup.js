function validateSignup() {
    if (!fullname || !username || !password || !confirmPassword || !gender) {
        res.status(400).json({
            error: "missing required fields",
            message: "Please ensure all mandatory fields are provided.",
        });
        return;
    }
    if (password.length < 8) {
        res.status(400).json({
            error: "password too short",
            message: "Password must be at least 8 characters long.",
        });
        return;
    }
    if (password !== confirmPassword) {
        res.status(400).json({
            error: "password mismatch",
            message: "Password and Confirm Password must match.",
        });
        return;
    }
}
export default validateSignup;

const protectRoute = (req, res, next) => {
    try {
        const token = req.cookies.auth_token;
    }
    catch (error) {
        console.log("Error in protectRoute middleware");
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while protecting the route",
        });
    }
};
export default protectRoute;

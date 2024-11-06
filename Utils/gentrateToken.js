const JWT = require("jsonwebtoken");

const gentrateToken = (id, statusCode, res) => {
    const token = JWT.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.cookie("jwt", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "development" ? false : true,
    })
    res.status(statusCode).json({
        success: true,
        token,
        message: "User Registered successfully",
        message: "User Logged in successfully",
        // data: user,
        // status: "success",
    });
};

module.exports = gentrateToken;
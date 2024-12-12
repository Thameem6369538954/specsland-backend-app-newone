const JWT = require("jsonwebtoken");

const generateToken = (id, statusCode, res) => {
  // Log the JWT_SECRET for debugging (make sure not to do this in production)
  console.log("jwt", process.env.JWT_SECRET);

  // Create the JWT token
  const token = JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Token expires in 1 day
  });

  // Set the token in an HttpOnly cookie
  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    sameSite: "none", // Necessary for cross-origin requests
    secure: process.env.NODE_ENV === "development" ? false : true, // Only send cookie over HTTPS in production
  });

  // Send the response
  return token;
};

module.exports = generateToken;

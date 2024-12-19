const JWT = require("jsonwebtoken");

const generateToken = (id, statusCode, res) => {
  // Log the JWT_SECRET for debugging (make sure not to do this in production)
  console.log("jwt", process.env.JWT_SECRET);

  // Create the JWT token
  const token = JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Token expires in 1 day
  });

  // Set the token in an HttpOnly cookie
 // When sending the JWT cookie (during login or after some other action):
res.cookie('token', jwtToken, {
  httpOnly: true,        // Ensures the cookie is not accessible via JavaScript
  secure: true,          // Ensure it is sent only over HTTPS (important in production)
  sameSite: 'None',      // Required for cross-origin cookies
  maxAge: 24 * 60 * 60 * 1000, // Set the expiration time to 1 day (24 hours)
});


  // Send the response
  return token;
};

module.exports = generateToken;

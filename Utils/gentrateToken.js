const jwt = require("jsonwebtoken");

/**
 * Function to generate a JWT token for a user
 * @param {string} userId - The ID of the user for whom the token is being generated
 * @returns {string} - The generated JWT token
 */
const generateToken = (userId) => {
  // Ensure the JWT_SECRET is defined in your environment variables
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  // Generate the token
  return jwt.sign(
    { id: userId }, // Payload
    process.env.JWT_SECRET, // Secret key
    { expiresIn: "1h" } // Token expiration
  );
};

module.exports = generateToken;

const JWT = require("jsonwebtoken");

const generateToken = (id, statusCode, res) => {
  console.log("jwt", process.env.JWT_SECRET);

  const token = JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d", 
  });

res.cookie('token', jwtToken, {
  httpOnly: true,        
  secure: true,         
  sameSite: 'None',     
  maxAge: 24 * 60 * 60 * 1000, 
});
  return token;
};

module.exports = generateToken;

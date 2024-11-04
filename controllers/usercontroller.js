const User = require("../Models/Usermodels.js");
const bcrypt = require("bcryptjs");
const gentrateToken = require("../Utils/gentrateToken.js");

exports.createUser = async (req, res) => {

  const createuser = await User.create(req.body);

  res.status(201).json({  
    status: "success",
    data: {
      data: createuser,
    },  

  });

};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Use `User` instead of `user` here
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Assuming gentrateToken is a function that generates a token
        gentrateToken(user._id, 200, res);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "vanakam da mapla"
        });
    }
};

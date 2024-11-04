const User = require("../Models/Usermodels.js");
const bcrypt = require("bcryptjs");
const gentrateToken = require("../Utils/gentrateToken.js");

exports.createUser = async (req, res) => {
  const { username, email, password, confrimPassword, mobileNumber } = req.body;
  
   if (!password) {
     return res.status(400).json({ error: "Password is required" });
   }

  try {
    // Check if user email or username already exists
    const userMailexist = await User.findOne({ email });
    const userNameexist = await User.findOne({ username });


    if (userMailexist || userNameexist) {
      return res.status(400).json({
        success: false,
        message: "Email or Username already exists",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      confrimPassword,
      mobileNumber,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate token and send response
    gentrateToken(newUser._id, 201, res);

    // If `gentrateToken` doesn’t send a response, uncomment the following code:
    /*
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      mobileNumber: newUser.mobileNumber,
    });
    */
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
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

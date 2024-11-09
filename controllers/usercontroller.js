const User = require("../Models/Usermodels.js");
const bcrypt = require("bcryptjs");
const gentrateToken = require("../Utils/gentrateToken.js");

exports.getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error in getUser function:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createUser = async (req, res) => {
  
  console.log(req.body);
  const { username, email, password, confrimPassword, mobileNumber } = req.body;

   if (!password) {
     return res.status(400).json({ error: "Password is required" });
   }
   if (!password || typeof password !== "string" || password.trim() === "") {
     return res.status(400).json({ error: "Valid password is required" });
   }
   if (password !== confrimPassword) {
     return res.status(400).json({ error: "Passwords do not match" });
   }

if (password !== confrimPassword) {
  return res.status(400).json({ error: "Passwords do not match" });
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
    console.log(newUser);
    

    // Save the new user to the database
    await newUser.save();

    // Generate token and send response
    gentrateToken(newUser._id, 201, res);

    res.status(201).json({
      success: true,
      data: newUser,
      message: "User Registered successfully",
      token: gentrateToken(newUser._id, 201, res),
    });

  
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
      
      
    });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token and set cookie
    const token = gentrateToken(user._id, 200, res);

    return res.status(200).json({ message: "Login successful",data:user, token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.userlogout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, confirmPassword, mobileNumber, gender } =
      req.body;
    console.log("ID:", req.params.id); // Log ID
    console.log("Request Body:", req.body); // Log form data

    // Check if the password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Prepare the updateFields object
    const updateFields = {};

    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (mobileNumber) updateFields.mobileNumber = mobileNumber;
    if(password) updateFields.password = password;
    if (gender) updateFields.gender = gender;

    // If the password is provided, hash it before updating
    if (password) {
      const salt = await bcrypt.genSalt(10); // Generate salt
      updateFields.password = await bcrypt.hash(password, salt); // Hash the password
    }

    // Find the user by ID and update the fields
    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    // If no user is found, return 404
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the updated user (excluding the password)
    const { password: _, ...userData } = updatedUser.toObject(); // Remove the password from the response

    return res.status(200).json({
      message: "Profile updated successfully",
      data: userData,
    });
  } catch (error) {
    console.error("Error during profile update:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



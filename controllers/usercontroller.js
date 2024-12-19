const User = require("../Models/Usermodels.js");
const bcrypt = require("bcryptjs");
const gentrateToken = require("../Utils/gentrateToken.js");
const { putObjectCommand } = require("../Aws/s3Client.js");
const { uploadFileToS3 } = require('../Config/fileUploadService.js');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../Config/awsConfig.js');

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
    const { username, email, mobileNumber, gender } =
      req.body;

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check current password
   

    // Update other fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (mobileNumber) user.mobileNumber = mobileNumber;
    if (gender) user.gender = gender;
  

    // Save the updated user to the database
    await user.save();

    const { ...userData } = user.toObject();
    res.status(200).json({
      message: "Profile updated successfully",
      data: userData,
    });
  } catch (error) {
    console.error("Error during profile update:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add this method to handle uploading the user's profile image




exports.uploadProfileImage = async (req, res) => {
  try {
    const { id } = req.params; // Get the user ID from the URL parameter
    const user = await User.findById(id); // Find the user in the database
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.file; // The file from the request
    const fileName = `profile-${id}-${Date.now()}.jpg`; // Create a unique file name
    const fileBuffer = file.buffer; // Get the file content from the buffer

    // Upload the file to S3
    const result = await uploadFileToS3(fileBuffer, fileName, process.env.AWS_S3_BUCKET_NAME);

    // Get the URL of the uploaded image
    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    // Update the user's profile image URL in the database
    user.profileImage = imageUrl;
    await user.save();

    // Send the updated user profile with the image URL
    res.status(200).json({
      message: 'Profile image uploaded successfully',
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error('Error during profile image upload:', error);
    res.status(500).json({ message: 'Server error' });
  }
};








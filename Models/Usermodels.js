const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    confrimPassword: {
      type: String,
      required: true,
      minLength: 6,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      // required: true
    },
    profileImage: {
      type: String, // URL of the profile image
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema)  
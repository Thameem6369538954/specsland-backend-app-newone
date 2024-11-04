const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    confrimPassword: {
        type: String,
        required: true,
        minLength: 6
    },
    mobileNumber: {
        type: Number
    },
},{timestamps : true});

module.exports = mongoose.model("User", UserSchema)  
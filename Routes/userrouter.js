const express = require('express');
const router = express.Router();
const {
  createUser,
  loginUser,
  getUser,
  userlogout,
  updateProfile,
  uploadProfileImage,
  uploadFile
} = require("../controllers/usercontroller");

console.log('userlogout :', userlogout);



router.route("/userRegister").post(createUser);
router.route("/file").post(uploadFile);
router.route("/getUser").get(getUser);
router.route("/login").post(loginUser);
router.route("/profileUpdate/:id").put(uploadProfileImage);
router.route("/logout").post(userlogout);
router.route("/update/:id").put(updateProfile);

module.exports = router
const express = require('express');
const router = express.Router();
const {
  createUser,
  loginUser,
  getUser,
  userlogout,
  updateProfile,
  uploadProfileImage,
} = require("../controllers/usercontroller");
console.log('updateProfile:', uploadProfileImage);



router.route("/userRegister").post(createUser);
router.route("/getUser").get(getUser);
router.route("/login").post(loginUser);
router.route("/profileUpdate/:id").put(uploadProfileImage);
router.route("/logout").post(userlogout);
router.route("/update/:id").put(updateProfile);

module.exports = router
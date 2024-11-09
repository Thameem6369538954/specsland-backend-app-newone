const express = require('express');
const router = express.Router();
const {
  createUser,
  loginUser,
  getUser,
  userlogout,
  updateProfile,
} = require("../controllers/usercontroller");


router.route("/userRegister").post(createUser);
router.route("/getUser").get(getUser);
router.route("/login").post(loginUser);
router.route("/logout").post(userlogout);
router.route("/update/:id").put(updateProfile);

module.exports = router
const express = require('express');
const router = express.Router();
const {
  createUser,
  loginUser,
  getUser,
  userlogout,
} = require("../controllers/usercontroller");


router.route("/userRegister").post(createUser);
router.route("/getUser").get(getUser);
router.route("/login").post(loginUser);
router.route("/logout").post(userlogout);

module.exports = router
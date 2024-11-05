const express = require('express');
const router = express.Router();
const { createUser, loginUser, getUser } = require("../controllers/usercontroller");


router.route("/userRegister").post(createUser);
router.route("/getUser").get(getUser);
router.route("/login").post(loginUser);

module.exports = router
const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require("../controllers/usercontroller");


router.route("/userRegister").post(createUser);
router.route("/userRegister").get(createUser);
router.route("/login").post(loginUser);

module.exports = router
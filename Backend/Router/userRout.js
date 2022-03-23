const express = require('express');
const { RegisterUser, LoginUser,LogoutUser } = require('../controller/userController');
const router = express.Router();


router.route('/register').post(RegisterUser);
router.route('/login').post(LoginUser);
router.route('/logout').get(LogoutUser);


module.exports = router;
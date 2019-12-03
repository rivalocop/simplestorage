const express = require('express');
const router = express.Router();

const UserController = require('./../controllers/users.controller');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/loginGmail', UserController.loginGmail);
router.get('/verifyEmail/:token', UserController.verifyEmail);

module.exports = router;
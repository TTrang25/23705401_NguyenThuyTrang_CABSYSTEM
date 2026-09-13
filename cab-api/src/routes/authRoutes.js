const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register); // UC01, UC13
router.post('/login', authController.login);        // UC02

module.exports = router;

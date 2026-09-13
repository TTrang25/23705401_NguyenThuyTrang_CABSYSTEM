const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const notificationController = require('../controllers/notificationController');

router.use(authenticate);
router.get('/', notificationController.getMyNotifications);

module.exports = router;

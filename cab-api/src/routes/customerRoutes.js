const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const customerController = require('../controllers/customerController');

router.use(authenticate, authorize('customer'));

router.get('/me', customerController.getMe);           // UC03
router.put('/me', customerController.updateMe);         // UC03
router.get('/me/history', customerController.getHistory); // UC07

module.exports = router;

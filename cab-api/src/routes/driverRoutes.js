const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const driverController = require('../controllers/driverController');

router.use(authenticate, authorize('driver'));

router.get('/me', driverController.getMe);                       // UC14
router.put('/me', driverController.updateMe);                     // UC14
router.put('/me/vehicle', driverController.upsertVehicle);        // UC15
router.put('/me/status', driverController.updateStatus);          // UC16
router.put('/me/location', driverController.updateLocation);      // UC21
router.get('/me/trip-requests', driverController.getMyTripRequests); // UC17

module.exports = router;

const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const tripController = require('../controllers/tripController');

router.use(authenticate);

// Customer-facing
router.post('/', authorize('customer'), tripController.createTrip);           // UC04
router.put('/:id/cancel', authorize('customer'), tripController.cancelTrip);   // UC06
router.post('/:id/payment', authorize('customer'), tripController.payTrip);    // UC09
router.post('/:id/rating', authorize('customer'), tripController.rateTrip);    // UC11

// Driver-facing
router.put('/:id/accept', authorize('driver'), tripController.acceptTrip);         // UC18
router.put('/:id/reject', authorize('driver'), tripController.rejectTrip);         // UC19
router.put('/:id/status', authorize('driver'), tripController.updateTripStatus);   // UC20 / UC22

// Shared (customer, driver, staff can all view)
router.get('/:id', authorize('customer', 'driver', 'staff'), tripController.getTrip);         // UC05
router.get('/:id/fare', authorize('customer', 'driver', 'staff'), tripController.getFare);     // UC08
router.get('/:id/payment', authorize('customer', 'driver', 'staff'), tripController.getPayment); // UC10

module.exports = router;

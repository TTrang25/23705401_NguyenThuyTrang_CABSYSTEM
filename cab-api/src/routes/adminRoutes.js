const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

router.use(authenticate, authorize('staff'));

router.get('/customers', adminController.listCustomers);            // UC23
router.get('/drivers', adminController.listDrivers);                 // UC24
router.get('/vehicles', adminController.listVehicles);                // UC25
router.get('/trips', adminController.listTrips);                      // UC26
router.get('/trips/ongoing', adminController.listOngoingTrips);       // UC27
router.get('/drivers/status', adminController.listDriverStatus);      // UC28
router.put('/trips/:id/incident', adminController.resolveIncident);   // UC29
router.get('/transactions', adminController.listTransactions);        // UC30
router.get('/reports', adminController.getReports);                   // UC31
router.put('/users/:id/role', adminController.updateUserRole);        // UC32
router.get('/audit-logs', adminController.listAuditLogs);             // BR11/BR26/NFR07

module.exports = router;

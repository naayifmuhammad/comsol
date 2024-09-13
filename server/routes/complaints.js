const express = require('express');
const router = express.Router();
const complaintsController = require('../controllers/complaintsController');

// Define the route for complaints
router.post('/', complaintsController.registerComplaint);

router.get('/', complaintsController.getAllComplaints);

module.exports = router;

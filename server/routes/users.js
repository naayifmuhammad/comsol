const express = require('express');
const { getUser } = require('../controllers/userController');
const router = express.Router();

// Route to get the current user
router.get('/user', getUser);

module.exports = router;

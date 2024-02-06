const express = require('express');
const { createOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/userMiddleware');
const router = express.Router();

router.route('/').post(protect, createOrder);

module.exports = router;

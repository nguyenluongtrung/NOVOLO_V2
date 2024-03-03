const express = require('express');
const {
	createOrder,
	get5BestSellingProducts,
	getRevenueByCategory,
} = require('../controllers/orderController');
const { protect } = require('../middleware/userMiddleware');
const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/5BestSellingProducts').get(protect, get5BestSellingProducts);
router.route('/getRevenueByCategory').get(protect, getRevenueByCategory);

module.exports = router;

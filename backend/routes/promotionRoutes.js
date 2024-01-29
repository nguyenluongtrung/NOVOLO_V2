const express = require('express');
const {
	getAllPromotions,
	createPromotion,
	updatePromotion,
	deletePromotion,
	getPromotion,
} = require('../controllers/promotionController');
const { protect, restrict } = require('../middleware/userMiddleware');
const router = express.Router();

router
	.route('/')
	.get(protect, restrict('admin'), getAllPromotions)
	.post(protect, restrict('admin'), createPromotion);
router
	.route('/:promotionId')
	.get(protect, restrict('admin'), getPromotion)
	.patch(protect, restrict('admin'), updatePromotion)
	.delete(protect, restrict('admin'), deletePromotion);

module.exports = router;

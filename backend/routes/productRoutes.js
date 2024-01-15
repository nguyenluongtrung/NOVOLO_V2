const express = require('express');
const {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
} = require('../controllers/productController');
const { protect, restrict } = require('./../middleware/userMiddleware');
const router = express.Router();

router
	.route('/')
	.get(getAllProducts)
	.post(protect, restrict('admin', 'staff'), createProduct);
router
	.route('/:id')
	.patch(protect, restrict('admin', 'staff'), updateProduct)
	.delete(protect, restrict('admin', 'staff'), deleteProduct)
	.get(getProductById);

module.exports = router;

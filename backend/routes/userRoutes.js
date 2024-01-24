const express = require('express');
const {
	getUserInformation,
	register,
	login,
	updateUserInformation,
	addProductToWishList,
	deleteProductFromWishList,
} = require('../controllers/userController');
const { protect } = require('./../middleware/userMiddleware');
const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(register);
router
	.route('/information')
	.get(protect, getUserInformation)
	.patch(protect, updateUserInformation);
router
	.route('/wishList/:productId')
	.post(protect, addProductToWishList)
	.delete(protect, deleteProductFromWishList);

module.exports = router;

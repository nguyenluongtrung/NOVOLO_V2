const express = require('express');
const {
	getAllCategories,
	getCategoryById,
} = require('../controllers/categoryController');
const router = express.Router();

router.route('/').get(getAllCategories);
router.route('/:categoryId').get(getCategoryById);

module.exports = router;

const asyncHandler = require('express-async-handler');
const Category = require('./../models/categoryModel');

const getAllCategories = asyncHandler(async (req, res) => {
	const categories = await Category.find({});

	res.status(200).json({
		status: 'success',
		data: {
			categories,
		},
	});
});

const getCategoryById = asyncHandler(async (req, res) => {
	const category = await Category.findById(req.params.categoryId);

	res.status(200).json({
		status: 'success',
		data: {
			category,
		},
	});
});

module.exports = {
	getAllCategories,
	getCategoryById,
};

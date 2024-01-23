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

module.exports = {
	getAllCategories,
};

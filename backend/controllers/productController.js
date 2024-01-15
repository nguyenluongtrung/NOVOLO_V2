const asyncHandler = require('express-async-handler');

const Product = require('./../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');

const getAllProducts = asyncHandler(async (req, res) => {
	const features = new ApiFeatures(Product.find(), req.query).filter();

	const products = await features.query;

	res.status(200).json({
		status: 'success',
		length: products.length,
		data: {
			products,
		},
	});
});

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	res.status(200).json({
		status: 'success',
		data: {
			product,
		},
	});
});

const createProduct = asyncHandler(async (req, res) => {
	const product = await Product.create(req.body);

	res.status(200).json({
		status: 'success',
		data: {
			product,
		},
	});
});

const updateProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		res.status(400);
		throw new Error('Product not found!');
	}

	const updatedProduct = await Product.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	);

	res.status(200).json({
		status: 'success',
		data: {
			updatedProduct,
		},
	});
});

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		res.status(400);
		throw new Error('Product not found!');
	}

	await Product.findByIdAndDelete(req.params.id);

	res.status(200).json({
		status: 'success',
		data: {
			id: req.params.id,
		},
	});
});

module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};

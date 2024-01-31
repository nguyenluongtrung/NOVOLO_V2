const asyncHandler = require('express-async-handler');

const Product = require('./../models/productModel');
const Price = require('./../models/priceModel');
const User = require('./../models/userModel');
const ApiFeatures = require('../utils/apiFeatures');

const getAllProducts = asyncHandler(async (req, res) => {
	const features = new ApiFeatures(Product.find(), req.query).filter();

	const products = await features.query;

	if (req.query.price) {
		let results = [];
		for (let p of products) {
			const product = await Product.findById(p.productId);
			results.push(product);
		}
		res.status(200).json({
			status: 'success',
			length: results.length,
			data: {
				products: results,
			},
		});
	} else {
		res.status(200).json({
			status: 'success',
			length: products.length,
			data: {
				products,
			},
		});
	}
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
	const { price: priceValue } = req.body;
	const {
		name,
		image,
		categoryID,
		calories,
		isSurprise,
		accumulatedPoint,
		exchangedPoint,
		startDate,
		endDate,
	} = req.body;

	const product = await Product.create({
		name,
		image,
		categoryID,
		calories,
		isSurprise,
		accumulatedPoint,
		exchangedPoint,
		startDate,
		endDate,
	});

	const price = await Price.create({
		productId: product._id,
		price: priceValue,
	});

	res.status(200).json({
		status: 'success',
		data: {
			product,
			price,
		},
	});
});

const updateProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		res.status(404);
		throw new Error('Product not found!');
	}

	const { price: priceValue } = req.body;

	const {
		name,
		image,
		categoryID,
		calories,
		isSurprise,
		accumulatedPoint,
		exchangedPoint,
		productStatus,
		startDate,
		endDate,
	} = req.body;

	const updatedProduct = await Product.findByIdAndUpdate(
		req.params.id,
		{
			name,
			image,
			categoryID,
			calories,
			isSurprise,
			accumulatedPoint,
			exchangedPoint,
			productStatus,
			startDate,
			endDate,
		},
		{
			new: true,
		}
	);

	// find the newest price
	const price = await Price.findOne({
		productId: req.params.id,
		endDate: null,
	});

	if (priceValue != price.price) {
		const updatedPrice = await Price.findByIdAndUpdate(price._id, {
			endDate: Date.now(),
		});
		const newPrice = await Price.create({
			productId: req.params.id,
			price: priceValue,
			startDate: Date.now(),
		});

		res.status(200).json({
			status: 'success',
			data: {
				updatedProduct,
				newPrice,
			},
		});
	} else {
		res.status(200).json({
			status: 'success',
			data: {
				updatedProduct,
			},
		});
	}
});

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		res.status(404);
		throw new Error('Product not found!');
	}

	await Product.findByIdAndDelete(req.params.id);
	await Price.deleteMany({ productId: req.params.id });

	res.status(200).json({
		status: 'success',
		data: {
			id: req.params.id,
		},
	});
});

const getProductsFromWishList = asyncHandler(async (req, res) => {
	let productList = [];

	await Promise.all(
		req.user.wishList.productIds.map(async (productId) => {
			const product = await Product.findById(productId);
			productList.push(product);
		})
	);

	res.status(200).json({
		status: 'success',
		length: productList.length,
		data: {
			productList,
		},
	});
});

const getProductsFromCart = asyncHandler(async (req, res) => {
	const productList = await User.findById(req.user._id).populate({
		path: 'cart.products.productId',
		model: 'Product',
	});

	res.status(200).json({
		status: 'success',
		data: {
			productList,
		},
	});
});

module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductsFromWishList,
	getProductsFromCart,
};

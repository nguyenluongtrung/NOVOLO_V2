const asyncHandler = require('express-async-handler');

const Product = require('./../models/productModel');
const Price = require('./../models/priceModel');
const User = require('./../models/userModel');
const Category = require('./../models/categoryModel');
const ApiFeatures = require('../utils/apiFeatures');

const getAllProducts = asyncHandler(async (req, res) => {
	const beforePaginateList = await new ApiFeatures(
		Product.find(),
		req.query
	).filter().query;
	const features = new ApiFeatures(Product.find(), req.query)
		.filter()
		.paginate();

	const products = await features.query;
	let results = [];
	for (let p of products) {
		let product = req.query.price
			? await Product.findById(p.productId)
			: await Product.findById(p._id);

		if (product.isSurprise) {
			if (
				new Date().getTime() >= product.startDate.getTime() &&
				new Date().getTime() <= product.endDate.getTime()
			) {
				results.push(product);
			}
		} else {
			results.push(product);
		}
	}

	res.status(200).json({
		status: 'success',
		length: beforePaginateList.length,
		data: {
			products: results,
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

const getProductsByCategory = asyncHandler(async (req, res) => {
	const category = await Category.findOne({
		name: req.params.categoryName,
	});
	const products = await Product.find({ categoryID: category._id });

	res.status(200).json({
		status: 'success',
		data: {
			products,
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

	let product;

	if (req.body.comboIngredients) {
		product = await Product.create({
			name,
			image,
			categoryID,
			calories,
			isSurprise,
			accumulatedPoint,
			exchangedPoint,
			startDate,
			endDate,
			comboIngredients: req.body.comboIngredients,
		});
	} else {
		product = await Product.create({
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
	}

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

	let updatedProduct;

	if (req.body.comboIngredients) {
		updatedProduct = await Product.findByIdAndUpdate(
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
				comboIngredients: req.body.comboIngredients,
			},
			{
				new: true,
			}
		);
	} else {
		updatedProduct = await Product.findByIdAndUpdate(
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
	}

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

const updateRatings = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		res.status(404);
		throw new Error('Product not found!');
	}

	const { rating } = req.body;

	if (product.numberOfRatings === 0) {
		product.rating = rating;
	} else {
		product.rating = parseFloat(
			(product.rating * product.numberOfRatings + rating) /
				(product.numberOfRatings + 1)
		).toFixed(1);
	}

	product.numberOfRatings = product.numberOfRatings + 1;
	await product.save();

	res.status(200).json({
		status: 'success',
		data: {
			product,
		},
	});
});

const get5HighestRatingProducts = asyncHandler(async (req, res) => {
	const stats = await Product.aggregate([
		{ $sort: { rating: -1 } },
		{ $limit: 5 },
	]);

	res.status(200).json({
		status: 'success',
		data: {
			stats,
		},
	});
});

const get5LowestRatingProducts = asyncHandler(async (req, res) => {
	const stats = await Product.aggregate([
		{ $sort: { rating: 1 } },
		{ $limit: 5 },
	]);

	res.status(200).json({
		status: 'success',
		data: {
			stats,
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
	updateRatings,
	getProductsByCategory,
	get5HighestRatingProducts,
	get5LowestRatingProducts,
};

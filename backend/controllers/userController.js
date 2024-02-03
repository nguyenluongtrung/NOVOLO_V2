const asyncHandler = require('express-async-handler');
const User = require('./../models/userModel');
const Product = require('./../models/productModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.SECRET_STR, {
		expiresIn: '30d',
	});
};

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email }).select('+password');

	if (user && (await user.comparePasswordInDb(password, user.password))) {
		res.status(200).json({
			status: 'success',
			data: {
				user,
				token: generateToken(user._id),
			},
		});
	} else {
		res.status(400);
		throw new Error('Email or password is invalid!');
	}
});

const register = asyncHandler(async (req, res) => {
	const { email } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create(req.body);

	if (user) {
		res.status(201).json({
			status: 'success',
			data: {
				user,
				token: generateToken(user._id),
			},
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

const getUserInformation = asyncHandler(async (req, res) => {
	res.status(200).json({
		status: 'success',
		data: {
			user: req.user,
		},
	});
});

const updateUserInformation = asyncHandler(async (req, res) => {
	const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
		new: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			updatedUser,
		},
	});
});

const addProductToWishList = asyncHandler(async (req, res) => {
	if (
		!req.user.wishList.productIds.find(
			(productId) => productId == req.params.productId
		)
	) {
		req.user.wishList.productIds.push(req.params.productId);
		await req.user.save();

		res.status(201).json({
			status: 'success',
			data: {
				user: req.user,
			},
		});
	} else {
		res.status(400);
		throw new Error('ProductId existed!');
	}
});

const deleteProductFromWishList = asyncHandler(async (req, res) => {
	if (req.user.wishList.productIds.includes(req.params.productId)) {
		req.user.wishList.productIds = req.user.wishList.productIds.filter(
			(productId) => productId != req.params.productId
		);

		await req.user.save();

		res.status(200).json({
			status: 'success',
			data: {
				user: req.user,
			},
		});
	} else {
		res.status(404);
		throw new Error('ProductId not found!');
	}
});

const addProductsToCart = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.body.productId);
	if (!product) {
		res.status(404);
		throw new Error('ProductId not found!');
	}

	const item = req.user.cart.products.find(
		(product) => product.productId == req.body.productId
	);
	if (!item) {
		req.user.cart.products.push(req.body);
	} else {
		item.quantity = item.quantity + req.body.quantity;
	}

	await req.user.save();

	res.status(201).json({
		status: 'success',
		data: {
			user: req.user,
		},
	});
});

const deleteProductsFromCart = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.productId);
	if (!product) {
		res.status(404);
		throw new Error('ProductId not found!');
	}

	req.user.cart.products = req.user.cart.products.filter(
		(product) =>
			product.productId.toString() !== req.params.productId.toString()
	);

	await req.user.save();
	res.status(200).json({
		status: 'success',
		data: {
			user: req.user,
		},
	});
});

const deleteAllProductsFromCart = asyncHandler(async (req, res) => {
	req.user.cart.products = [];

	await req.user.save();
	res.status(200).json({
		status: 'success',
		data: {
			user: req.user,
		},
	});
});

module.exports = {
	login,
	register,
	getUserInformation,
	updateUserInformation,
	addProductToWishList,
	deleteProductFromWishList,
	addProductsToCart,
	deleteProductsFromCart,
	deleteAllProductsFromCart,
};

const asyncHandler = require('express-async-handler');
const User = require('./../models/userModel');
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

module.exports = {
	login,
	register,
	getUserInformation,
	updateUserInformation,
};

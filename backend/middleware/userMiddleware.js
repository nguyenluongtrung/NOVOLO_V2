const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
	let token;

	console.log('protect: ' + req.headers.authorization);

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];

			const decoded = jwt.verify(token, process.env.SECRET_STR);

			req.user = await User.findById(decoded.id).select('-password');

			next();
		} catch (error) {
			res.status(401);
			throw new Error('Not authorized!');
		}

		if (!token) {
			res.status(401);
			throw new Error('Not authorized, no token 1');
		}
	} else {
		res.status(401);
		throw new Error('Not authorized, no token 2');
	}
});

const restrict = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			res.status(403);
			throw new Error('You do not have permission to perform this action');
		}
		next();
	};
};

module.exports = { protect, restrict };

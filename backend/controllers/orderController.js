const asyncHandler = require('express-async-handler');
const Order = require('./../models/orderModel');

const createOrder = asyncHandler(async (req, res) => {
	const order = await Order.create(req.body);

	res.status(201).json({
		status: 'success',
		data: {
			order,
		},
	});
});

module.exports = {
	createOrder,
};

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

const get5BestSellingProducts = asyncHandler(async (req, res) => {
	const tempResult = await Order.aggregate([
		{
			$unwind: '$statusHistory',
		},
		{
			$match: {
				'statusHistory.status': 'fulfilled',
			},
		},
		{
			$unwind: '$purchasedItems.products',
		},
		{
			$group: {
				_id: '$purchasedItems.products.productId',
				totalQuantity: { $sum: '$purchasedItems.products.quantity' },
			},
		},
		{
			$sort: { totalQuantity: -1 },
		},
		{
			$lookup: {
				from: 'products',
				localField: '_id',
				foreignField: '_id',
				as: 'product',
			},
		},
		{
			$unwind: '$product',
		},
	]);

	let result = [];
	let others = {};
	let otherQuantity = 0;

	for (let i = 5; i < tempResult.length; i++) {
		otherQuantity += Number(tempResult[i].totalQuantity);
	}

	others = {
		totalQuantity: otherQuantity,
		product: {
			name: 'Others',
		},
	};

	result.push(
		tempResult[0],
		tempResult[1],
		tempResult[2],
		tempResult[3],
		tempResult[4],
		others
	);

	res.status(200).json({
		status: 'success',
		data: {
			result,
		},
	});
});

const getRevenueByCategory = asyncHandler(async (req, res) => {
	const result = await Order.aggregate([
		{
			$unwind: '$purchasedItems.products',
		},
		{
			$group: {
				_id: '$purchasedItems.products.productId',
				totalQuantity: { $sum: '$purchasedItems.products.quantity' },
			},
		},
		{
			$lookup: {
				from: 'products',
				localField: '_id',
				foreignField: '_id',
				as: 'product',
			},
		},
		{
			$unwind: '$product',
		},
		{
			$group: {
				_id: '$product.categoryID',
				total: {
					$sum: { $multiply: ['$totalQuantity', '$product.rating'] },
				},
			},
		},
	]);

	res.status(200).json({
		status: 'success',
		data: {
			result,
		},
	});
});

module.exports = {
	createOrder,
	get5BestSellingProducts,
	getRevenueByCategory,
};

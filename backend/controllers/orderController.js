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
	const result = await Order.aggregate([
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
			$limit: 5,
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

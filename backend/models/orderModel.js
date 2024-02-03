const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
	totalPrice: {
		type: Number,
		required: [true, 'Total price is mandatory'],
	},
	note: {
		type: String,
	},
	shipping: {
		name: {
			type: String,
			required: [true, 'Shipping name is mandatory'],
		},
		address: {
			type: String,
			required: [true, 'Shipping address is mandatory'],
		},
		phone: {
			type: String,
			required: [true, 'Shipping phone is mandatory'],
		},
		email: {
			type: String,
			required: [true, 'Shipping email is mandatory'],
		},
	},
	date: {
		type: Date,
		default: Date.now(),
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'UserId is mandatory'],
	},
	statusHistory: {
		type: [
			{
				status: {
					type: String,
					enum: ['pending', 'rejected', 'fulfilled'],
					required: [true, 'Status is mandatory'],
					default: 'pending',
				},
				date: {
					type: Date,
					default: Date.now(),
					required: [true, 'Date is mandatory'],
				},
			},
		],
		default: [{ status: 'pending', date: Date.now() }],
	},
	purchasedItems: {
		products: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
					required: [true, 'ProductId is mandatory'],
				},
				quantity: {
					type: Number,
					required: [true, 'Quantity is mandatory'],
				},
			},
		],
	},
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

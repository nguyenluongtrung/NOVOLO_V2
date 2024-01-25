const mongoose = require('mongoose');

const priceSchema = mongoose.Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: [true, 'ProductId is mandatory'],
	},
	price: {
		type: Number,
		required: [true, 'Price is mandatory'],
	},
	startDate: {
		type: Date,
		default: Date.now(),
	},
	endDate: {
		type: Date,
		default: null,
	},
});

module.exports = mongoose.model('Price', priceSchema);

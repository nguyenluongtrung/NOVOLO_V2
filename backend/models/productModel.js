const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Product name is mandatory'],
		unique: true,
	},
	image: {
		type: String,
		required: [true, 'Product image is mandatory'],
	},
	categoryID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: [true, 'CategoryID is mandatory'],
	},
	calories: {
		type: Number,
		required: [true, 'Product calories is mandatory'],
	},
	isSurprise: {
		type: Boolean,
		required: [true, 'Is surprise is mandatory'],
		default: false,
	},
	rating: {
		type: Number,
		default: 5.0,
		min: [1.0, 'Rating must be greater or equal to 1.0'],
		max: [5.0, 'Rating must be less or equal to 5.0'],
	},
	numberOfRatings: {
		type: Number,
		default: 0,
	},
	accumulatedPoint: {
		type: Number,
		required: [true, 'Accumulated point is mandatory'],
		min: [1, 'Accumulated point must be greater or equal to 1'],
	},
	exchangedPoint: {
		type: Number,
		required: [true, 'Exchanged point is mandatory'],
		min: [0, 'Exchanged point must be greater or equal to 0'],
	},
	productStatus: {
		type: Boolean,
		required: [true, 'Product status is mandatory'],
		default: true,
	},
	promotionIds: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Promotion',
			default: [],
		},
	],
	startDate: {
		type: Date,
	},
	endDate: {
		type: Date,
	},
	comboIngredients: {
		type: [
			{
				quantity: {
					type: Number,
				},
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
				},
			},
		],
		default: [],
	},
});

module.exports = mongoose.model('Product', productSchema);

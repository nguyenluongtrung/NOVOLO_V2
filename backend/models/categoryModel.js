const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
	name: {
		type: String,
		unique: true,
		enum: [
			'Chicken',
			'Sandwich',
			'Burger',
			'Beverage',
			'Spaghetti',
			'Salad',
			'Taco',
			'French Fries',
			'Dessert',
			'Side Dish',
		],
	},
});

const Category = mongoose.model('categories', categorySchema);
module.exports = Category;

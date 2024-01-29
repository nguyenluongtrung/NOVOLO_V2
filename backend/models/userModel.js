const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
	{
		role: {
			type: String,
			enum: ['user', 'admin', 'staff'],
			required: [true, 'User role is mandatory'],
			default: 'user',
		},
		createdDate: {
			type: Date,
			default: Date.now(),
		},
		name: {
			type: String,
			required: [true, 'User name is mandatory'],
		},
		address: {
			type: String,
		},
		phone: {
			type: String,
		},
		email: {
			type: String,
			required: [true, 'User email is mandatory'],
			validate: [validator.isEmail, 'Please enter a valid email'],
		},
		dob: {
			type: Date,
		},
		gender: {
			type: String,
			enum: ['male', 'female', 'other'],
			required: [true, 'User gender is mandatory'],
		},
		totalAccumulatedPoint: {
			type: Number,
			default: 0,
		},
		wishList: {
			productIds: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
				},
			],
			comboIds: Array,
		},
		cart: {
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
		password: {
			type: String,
			required: [true, 'User password is mandatory'],
			minLength: [8, 'User password contains more than 8 characters'],
			select: false,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	this.password = await bcrypt.hash(this.password, 12);
	next();
});

userSchema.methods.comparePasswordInDb = async function (pswd, pswdDB) {
	return await bcrypt.compare(pswd, pswdDB);
};

module.exports = mongoose.model('User', userSchema);

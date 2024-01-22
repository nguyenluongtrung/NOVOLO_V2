export const rules = {
	email: {
		required: {
			value: true,
			message: 'Email is required',
		},
		pattern: {
			value: /^\S+@\S+\.\S+$/,
			message: 'Email must be in the right format',
		},
	},
	name: {
		required: {
			value: true,
			message: 'Name is required',
		},
		maxLength: {
			value: 255,
			message: 'Name must contain at most 255 characters',
		},
		minLength: {
			value: 5,
			message: 'Name must contain at least 5 characters',
		},
	},
	phone: {
		pattern: {
			value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
			message: 'Phone number is not valid',
		},
	},
	password: {
		required: {
			value: true,
			message: 'Password is required',
		},
		minLength: {
			value: 8,
			message: 'Password must contain at least 8 characters',
		},
	},
};

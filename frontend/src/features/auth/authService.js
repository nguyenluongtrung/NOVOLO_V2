import axios from 'axios';

const API_URL = '/novolo/api/users/';

// Login
const login = async (userData) => {
	const response = await axios.post(API_URL + 'login', userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data.data.user;
};

// Logout
const logout = async () => {
	localStorage.removeItem('user');
};

// Register
const register = async (userData) => {
	const response = await axios.post(API_URL + 'register', userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

// Get user information
const getUserInformation = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL + 'information', config);

	return response.data.data.user;
};

// Update user information
const updateUserInformation = async (userData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.patch(API_URL + 'information', userData, config);
	return response.data.data.updatedUser;
};

// Add product to wishlist
const addProductToWishList = async (productId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(
		API_URL + 'wishList/' + productId,
		null,
		config
	);
	return response.data.data.user;
};

// Delete product from wishlist
const deleteProductFromWishList = async (productId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(
		API_URL + 'wishList/' + productId,
		config
	);
	return response.data.data.user;
};

// Add products to cart
const addProductsToCart = async (itemData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL + 'cart', itemData, config);

	return response.data.data.user;
};

// Delete products from cart
const deleteProductsFromCart = async (productId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + `cart/${productId}`, config);

	return response.data.data.user;
};

// Delete all products from cart
const deleteAllProductsFromCart = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + 'cart', config);

	return response.data.data.user;
};

const authService = {
	login,
	logout,
	register,
	getUserInformation,
	updateUserInformation,
	addProductToWishList,
	deleteProductFromWishList,
	addProductsToCart,
	deleteProductsFromCart,
	deleteAllProductsFromCart,
};

export default authService;

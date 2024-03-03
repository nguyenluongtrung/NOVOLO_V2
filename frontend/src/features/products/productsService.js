import axios from 'axios';

const API_URL = '/novolo/api/products/';

// Get all products
const getAllProducts = async (searchData) => {
	let response;
	if (searchData !== '') {
		response = await axios.get(API_URL + `?${searchData}`);
	} else {
		response = await axios.get(API_URL);
	}

	return {
		products: response.data.data.products,
		productSize: response.data.length,
	};
};

// Get product
const getProductById = async (id) => {
	const response = await axios.get(API_URL + id);

	return response.data.data.product;
};

// Get products by category
const getProductsByCategory = async (categoryName) => {
	const response = await axios.get(API_URL + 'category/' + categoryName);

	return response.data.data.products;
};

// Create product
const createProduct = async (productData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, productData, config);

	return response.data.data.product;
};

// Delete product
const deleteProduct = async (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + id, config);

	return response.data;
};

// Update product
const updateProduct = async (chosenProductId, updateData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.patch(
		API_URL + chosenProductId,
		updateData,
		config
	);

	return response.data;
};

// Get products from wishlist
const getProductsFromWishList = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL + 'wishList', config);

	return response.data.data.productList;
};

// Get products from cart
const getProductsFromCart = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL + 'cart', config);

	return response.data.data.productList.cart.products;
};

// Update product's rating
const updateRatings = async (ratingData, productId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.patch(
		API_URL + 'rate/' + productId,
		ratingData,
		config
	);

	return response.data.data.product;
};

// Get highest rating products
const get5HighestRatingProducts = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL + 'highestRating', config);

	return response.data.data.stats;
};

// Get lowest rating products
const get5LowestRatingProducts = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL + 'lowestRating', config);

	return response.data.data.stats;
};

// Get 5 best selling products
const get5BestSellingProducts = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(
		'/novolo/api/orders/' + '5BestSellingProducts',
		config
	);

	return response.data.data.result;
};

// Get revenue by category
const getRevenueByCategory = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(
		'/novolo/api/orders/' + 'getRevenueByCategory',
		config
	);

	return response.data.data.result;
};

const productsService = {
	get5BestSellingProducts,
	getAllProducts,
	getProductById,
	createProduct,
	deleteProduct,
	updateProduct,
	getProductsFromWishList,
	getProductsFromCart,
	updateRatings,
	getProductsByCategory,
	get5HighestRatingProducts,
	get5LowestRatingProducts,
	getRevenueByCategory,
};

export default productsService;

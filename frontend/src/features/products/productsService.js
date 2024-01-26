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

	return response.data.data.products;
};

// Get product
const getProductById = async (id) => {
	const response = await axios.get(API_URL + id);

	return response.data.data.product;
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

// Get product from wishlist
const getProductsFromWishList = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL + 'wishList', config);

	return response.data.data.productList;
};

const productsService = {
	getAllProducts,
	getProductById,
	createProduct,
	deleteProduct,
	updateProduct,
	getProductsFromWishList,
};

export default productsService;

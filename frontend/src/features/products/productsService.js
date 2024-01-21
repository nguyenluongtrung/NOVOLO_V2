import axios from 'axios';

const API_URL = '/novolo/api/products/';

// Get all products
const getAllProducts = async () => {
	const response = await axios.get(API_URL);

	return response.data.data.products;
};

// Get product
const getProductById = async (id) => {
	const response = await axios.get(API_URL + id);

	return response.data;
};

// Create product
const createProduct = async (productData, token) => {
	const config = {
		headers: {
			Authentication: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, productData, config);

	return response.data;
};

// Delete product
const deleteProduct = async (id, token) => {
	const config = {
		headers: {
			Authentication: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + id, config);

	return response.data;
};

// Update product
const updateProduct = async (id, productData, token) => {
	const config = {
		headers: {
			Authentication: `Bearer ${token}`,
		},
	};

	const response = await axios.patch(API_URL + id, productData, config);

	return response.data;
};

const productsService = {
	getAllProducts,
	getProductById,
	createProduct,
	deleteProduct,
	updateProduct,
};

export default productsService;

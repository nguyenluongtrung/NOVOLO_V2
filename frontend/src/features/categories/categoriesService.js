import axios from 'axios';

const API_URL = '/novolo/api/categories/';

// Get all categories
const getAllCategories = async () => {
	const response = await axios.get(API_URL);
	return response.data.data.categories;
};

// Get category by Id
const getCategoryById = async (categoryId) => {
	const response = await axios.get(API_URL + categoryId);
	return response.data.data.category;
};

const categoriesService = {
	getAllCategories,
	getCategoryById,
};

export default categoriesService;

import axios from 'axios';

const API_URL = '/novolo/api/categories/';

// Get all categories
const getAllCategories = async () => {
	const response = await axios.get(API_URL);
	return response.data.data.categories;
};

const categoriesService = {
	getAllCategories,
};

export default categoriesService;

import axios from 'axios';

const API_URL = '/novolo/api/promotions/';

// Get all promotions
const getAllPromotions = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	let response = await axios.get(API_URL, config);

	return response.data.data.promotionList;
};

// Get promotion
const getPromotionById = async (id) => {
	const response = await axios.get(API_URL + id);

	return response.data.data.promotion;
};

// Create product
const createPromotion = async (promotionData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, promotionData, config);

	return response.data.data.product;
};

// Delete promotion
const deletePromotion = async (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + id, config);

	return response.data;
};

// Update Promotion
const updatePromotion = async (chosenPromotionId, updateData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.patch(
		API_URL + chosenPromotionId,
		updateData,
		config
	);

	return response.data;
};

const promotionsService = {
	getAllPromotions,
	getPromotionById,
	createPromotion,
	deletePromotion,
	updatePromotion,
};

export default promotionsService;

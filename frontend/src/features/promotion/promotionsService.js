import axios from 'axios';

const API_URL = '/novolo/api/promotions';

// Get all promotions
const getAllPromotions = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);
	return response.data.data.promotionList;
};

// Get promotion
const getPromotion = async (promotionId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL + `/${promotionId}`, config);
	return response.data.data.promotion;
};

// Delete promotion
const deletePromotion = async (promotionId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + `/${promotionId}`, config);
	return response.data.data.oldPromotion;
};

// Create promotion
const createPromotion = async (promotionData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, promotionData, config);
	return response.data.data.newPromotion;
};

// Update promotion
const updatePromotion = async (promotionData, promotionId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.patch(
		API_URL + `/${promotionId}`,
		promotionData,
		config
	);
	return response.data.data.updatedPromotion;
};

const promotionsService = {
	getAllPromotions,
	deletePromotion,
	createPromotion,
	updatePromotion,
	getPromotion,
};

export default promotionsService;

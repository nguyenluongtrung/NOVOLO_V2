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

const promotionsService = {
	getAllPromotions,
	deletePromotion,
};

export default promotionsService;

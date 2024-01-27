import axios from 'axios';

const API_URL = '/novolo/api/prices/';

// Get all prices
const getAllNewestPrices = async () => {
	const response = await axios.get(API_URL);
	return response.data.data.priceList;
};

const pricesService = {
	getAllNewestPrices,
};

export default pricesService;

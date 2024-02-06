import axios from 'axios';

const API_URL = '/novolo/api/promotions/';

const createSale = async (saleData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, saleData, config);

    return response.data.data.newPromotion;
};

const salesService = {
    createSale
};

export default salesService;
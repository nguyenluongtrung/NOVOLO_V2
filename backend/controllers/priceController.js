const asyncHandler = require('express-async-handler');
const Price = require('./../models/priceModel');

const getAllNewestPrices = asyncHandler(async (req, res) => {
	const priceList = await Price.find({ endDate: null });

	res.status(200).json({
		status: 'success',
		data: {
			priceList,
		},
	});
});

module.exports = {
	getAllNewestPrices,
};

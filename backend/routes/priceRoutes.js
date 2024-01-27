const express = require('express');
const { getAllNewestPrices } = require('../controllers/priceController');
const router = express.Router();

router.route('/').get(getAllNewestPrices);

module.exports = router;

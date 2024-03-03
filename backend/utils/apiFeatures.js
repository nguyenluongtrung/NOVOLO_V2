const Price = require('./../models/priceModel');

class ApiFeatures {
	constructor(query, queryStr) {
		this.query = query;
		this.queryStr = queryStr;
	}

	filter() {
		let queryString = JSON.stringify(this.queryStr);
		queryString = queryString.replace(
			/\b(gte|gt|lte|lt)\b/g,
			(match) => `$${match}`
		);
		const queryObj = JSON.parse(queryString);

		const excludeFields = ['sort', 'limit', 'page', 'fields'];
		excludeFields.forEach((el) => {
			delete queryObj[el];
		});

		if (queryObj.price) {
			this.query = Price.find({ ...queryObj, endDate: null });
		} else {
			this.query = this.query.find(queryObj);
		}

		return this;
	}

	paginate() {
		let page = +this.queryStr.page || 1;
		let limit = +this.queryStr.limit || 9;
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);
		return this;
	}
}

module.exports = ApiFeatures;

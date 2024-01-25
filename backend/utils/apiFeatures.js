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

		this.query = this.query.find(queryObj);
		return this;
	}
}

module.exports = ApiFeatures;
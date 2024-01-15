const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.CONN_STR);
		console.log('DB connected successfully!');
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

module.exports = connectDB;

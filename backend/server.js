const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');

const connectDB = require('./config/dbConnect');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());

app.use('/novolo/api/products', require('./routes/productRoutes'));
app.use('/novolo/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

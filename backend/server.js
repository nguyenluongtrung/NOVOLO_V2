const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');

const connectDB = require('./config/dbConnect');
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());

app.use(express.json());

app.use('/novolo/api/products', require('./routes/productRoutes'));
app.use('/novolo/api/users', require('./routes/userRoutes'));
app.use('/novolo/api/categories', require('./routes/categoryRoutes'));
app.use('/novolo/api/prices', require('./routes/priceRoutes'));
app.use('/novolo/api/promotions', require('./routes/promotionRoutes'));
app.use('/novolo/api/orders', require('./routes/orderRoutes'));
app.use('/novolo/api/comments', require('./routes/commentRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

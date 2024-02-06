import { configureStore } from '@reduxjs/toolkit';
import authReducer from './../features/auth/authSlice';
import productsReducer from './../features/products/productsSlice';
import categoriesReducer from './../features/categories/categoriesSlice';
import pricesReducer from './../features/prices/pricesSlice';
import salesReducer from './../features/sales/saleSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		products: productsReducer,
		categories: categoriesReducer,
		prices: pricesReducer,
		sales: salesReducer,
	},
});

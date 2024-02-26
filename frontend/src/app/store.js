import { configureStore } from '@reduxjs/toolkit';
import authReducer from './../features/auth/authSlice';
import productsReducer from './../features/products/productsSlice';
import categoriesReducer from './../features/categories/categoriesSlice';
import pricesReducer from './../features/prices/pricesSlice';
import ordersReducer from './../features/orders/ordersSlice';
import commentsReducer from './../features/comments/commentsSlice';
import promotionsReducer from './../features/promotion/promotionsSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		products: productsReducer,
		categories: categoriesReducer,
		prices: pricesReducer,
		orders: ordersReducer,
		comments: commentsReducer,
		promotions: promotionsReducer,
	},
});

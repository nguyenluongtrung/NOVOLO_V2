import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ordersService from './ordersService';

const user = JSON.parse(localStorage.getItem('user'));
console.log(user);

const initialState = {
	orders: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Create order
export const createOrder = createAsyncThunk(
	'orders/createOrder',
	async (orderData, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await ordersService.createOrder(orderData, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const orderSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.orders = action.payload;
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.orders = [];
			});
	},
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;

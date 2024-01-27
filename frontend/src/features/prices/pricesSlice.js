import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import pricesService from './pricesService';

const initialState = {
	prices: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Get all newest prices
export const getAllNewestPrices = createAsyncThunk(
	'prices/getAll',
	async (_, thunkAPI) => {
		try {
			return await pricesService.getAllNewestPrices();
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

export const priceSlice = createSlice({
	name: 'prices',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllNewestPrices.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllNewestPrices.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.prices = action.payload;
			})
			.addCase(getAllNewestPrices.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.prices = [];
			});
	},
});

export const { reset } = priceSlice.actions;
export default priceSlice.reducer;

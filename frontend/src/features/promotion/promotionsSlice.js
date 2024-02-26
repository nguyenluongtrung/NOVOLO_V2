import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import promotionsService from './promotionsService';

const user = JSON.parse(localStorage.getItem('user'));
console.log(user);

const initialState = {
	promotions: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const getAllPromotions = createAsyncThunk(
	'promotions/getAllPromotions',
	async (_, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await promotionsService.getAllPromotions(token);
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

export const deletePromotion = createAsyncThunk(
	'promotions/deletePromotion',
	async (promotionId, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await promotionsService.deletePromotion(promotionId, token);
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

export const promotionsSlice = createSlice({
	name: 'promotions',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllPromotions.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllPromotions.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.promotions = action.payload;
			})
			.addCase(getAllPromotions.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.promotions = [];
			})
			.addCase(deletePromotion.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deletePromotion.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.promotions = state.promotions.filter(
					(promotion) => promotion._id != action.payload._id
				);
			})
			.addCase(deletePromotion.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = promotionsSlice.actions;
export default promotionsSlice.reducer;

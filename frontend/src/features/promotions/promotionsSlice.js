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

// Get all promotions
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

// Get product by Id
export const getPromotionById = createAsyncThunk(
	'promotions/getPromotionById',
	async (id, thunkAPI) => {
		try {
			return await promotionsService.getPromotionById(id);
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

// Create product
export const createPromotion = createAsyncThunk(
	'promotions/create',
	async (promotionData, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await promotionsService.createPromotion(promotionData, token);
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

// Update product
export const updatePromotion = createAsyncThunk(
	'promotions/update',
	async ({ chosenPromotionId, updateData }, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await promotionsService.updatePromotion(
				chosenPromotionId,
				updateData,
				token
			);
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

// Delete product
export const deletePromotion = createAsyncThunk(
	'promotions/delete',
	async (id, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await promotionsService.deletePromotion(id, token);
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

export const promotionSlice = createSlice({
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
			.addCase(getPromotionById.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPromotionById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.promotions = action.payload;
			})
			.addCase(getPromotionById.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.promotions = [];
			})
			.addCase(createPromotion.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createPromotion.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.promotions.push(action.payload);
			})
			.addCase(createPromotion.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deletePromotion.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deletePromotion.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.promotions = state.promotions.filter(
					(product) => product._id !== action.payload.id
				);
			})
			.addCase(deletePromotion.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updatePromotion.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updatePromotion.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.promotions[
					state.promotions.findIndex(
						(product) => product._id == action.payload._id
					)
				] = action.payload;
			})
			.addCase(updatePromotion.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = promotionSlice.actions;
export default promotionSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoriesService from './categoriesService';

const initialState = {
	categories: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Get all categories
export const getAllCategories = createAsyncThunk(
	'categories/getAll',
	async (_, thunkAPI) => {
		try {
			return await categoriesService.getAllCategories();
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

// Get category by Id
export const getCategoryById = createAsyncThunk(
	'categories/getCategoryById',
	async (categoryId, thunkAPI) => {
		try {
			return await categoriesService.getCategoryById(categoryId);
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

export const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllCategories.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllCategories.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.categories = action.payload;
			})
			.addCase(getAllCategories.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.categories = [];
			})
			.addCase(getCategoryById.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCategoryById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.categories = action.payload;
			})
			.addCase(getCategoryById.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.categories = [];
			});
	},
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;

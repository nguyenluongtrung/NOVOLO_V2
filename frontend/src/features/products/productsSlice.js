import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productsService from './productsService';

const user = JSON.parse(localStorage.getItem('user'));
console.log(user);

const initialState = {
	products: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Get all products
export const getAllProducts = createAsyncThunk(
	'products/getAllProducts',
	async (searchData, thunkAPI) => {
		try {
			return await productsService.getAllProducts(searchData);
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
export const getProductById = createAsyncThunk(
	'products/getProductById',
	async (id, thunkAPI) => {
		try {
			return await productsService.getProductById(id);
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
export const createProduct = createAsyncThunk(
	'products/create',
	async (productData, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await productsService.createProduct(productData, token);
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
export const updateProduct = createAsyncThunk(
	'products/update',
	async ({ chosenProductId, updateData }, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await productsService.updateProduct(
				chosenProductId,
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
export const deleteProduct = createAsyncThunk(
	'products/delete',
	async (id, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await productsService.deleteProduct(id, token);
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

// Get products from wishlist
export const getProductsFromWishList = createAsyncThunk(
	'products/getProductsFromWishList',
	async (_, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await productsService.getProductsFromWishList(token);
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

// Get products from cart
export const getProductsFromCart = createAsyncThunk(
	'products/getProductsFromCart',
	async (_, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await productsService.getProductsFromCart(token);
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

export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products = action.payload;
			})
			.addCase(getAllProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.products = [];
			})
			.addCase(getProductById.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProductById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products = action.payload;
			})
			.addCase(getProductById.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.products = [];
			})
			.addCase(createProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products.push(action.payload);
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products = state.products.filter(
					(product) => product._id !== action.payload.id
				);
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products[
					state.products.findIndex(
						(product) => product._id == action.payload._id
					)
				] = action.payload;
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getProductsFromWishList.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProductsFromWishList.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products = action.payload;
			})
			.addCase(getProductsFromWishList.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getProductsFromCart.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProductsFromCart.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products = action.payload;
			})
			.addCase(getProductsFromCart.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;

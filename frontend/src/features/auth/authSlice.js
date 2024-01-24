import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));
console.log(user);

const initialState = {
	user: user || null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Login
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout();
});

// Register User
export const registerUser = createAsyncThunk(
	'auth/register',
	async (user, thunkAPI) => {
		try {
			return await authService.register(user);
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

// Get user information
export const getUserInformation = createAsyncThunk(
	'auth/getUserInformation',
	async (_, thunkAPI) => {
		try {
			const token = user.data.token;
			return await authService.getUserInformation(token);
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

// Update user information
export const updateUserInformation = createAsyncThunk(
	'auth/updateUserInformation',
	async (userData, thunkAPI) => {
		try {
			const token = user.data.token;
			return await authService.updateUserInformation(userData, token);
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

// Add products to wishlist
export const addProductToWishList = createAsyncThunk(
	'auth/addProductToWishList',
	async (productId, thunkAPI) => {
		try {
			const token = user.data.token;
			console.log('token day: ' + token);
			return await authService.addProductToWishList(productId, token);
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

// Delete products from wishlist
export const deleteProductFromWishList = createAsyncThunk(
	'auth/deleteProductFromWishList',
	async (productId, thunkAPI) => {
		try {
			const token = user.data.token;
			return await authService.deleteProductFromWishList(productId, token);
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

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isLoading = false;
			state.isSuccess = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			})
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(getUserInformation.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserInformation.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(getUserInformation.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(updateUserInformation.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUserInformation.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(updateUserInformation.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(addProductToWishList.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addProductToWishList.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(addProductToWishList.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteProductFromWishList.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteProductFromWishList.fulfilled, (state, action) => {
				console.log('Fulfilled Action:', action);
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(deleteProductFromWishList.rejected, (state, action) => {
				console.log('Rejected Action:', action);
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

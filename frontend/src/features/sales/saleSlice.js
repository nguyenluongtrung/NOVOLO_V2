import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import salesService from './salesService';

const user = JSON.parse(localStorage.getItem('user'));
console.log(user);

const initialState = {
	sales: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const createSale = createAsyncThunk(
    'sales/createSale',
    async (saledata, thunkAPI) => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const token = storedUser.data.token;
            return await salesService.createSale(saledata, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const saleSlice = createSlice({
	name: 'sales',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			
			.addCase(createSale.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createSale.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.sales.push(action.payload);
			})
			.addCase(createSale.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
	},
});

export const { reset } = saleSlice.actions;
export default saleSlice.reducer;
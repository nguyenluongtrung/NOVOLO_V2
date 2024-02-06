import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import commentsService from './commentsService';

const user = JSON.parse(localStorage.getItem('user'));
console.log(user);

const initialState = {
	comments: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Create comment
export const createComment = createAsyncThunk(
	'comments/createComment',
	async (commentData, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await commentsService.createComment(commentData, token);
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

export const commentSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createComment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createComment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.comments.push(action.payload);
			})
			.addCase(createComment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;

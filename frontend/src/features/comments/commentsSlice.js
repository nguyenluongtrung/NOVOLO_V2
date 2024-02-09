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

// Get all comments
export const getAllProductComments = createAsyncThunk(
	'comments/getAllProductComments',
	async (productId, thunkAPI) => {
		try {
			return await commentsService.getAllProductComments(productId);
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

// Increase like count
export const increaseLikeCount = createAsyncThunk(
	'comments/increaseLikeCount',
	async (commentId, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await commentsService.increaseLikeCount(commentId, token);
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

// Increase dislike count
export const increaseDislikeCount = createAsyncThunk(
	'comments/increaseDislikeCount',
	async (commentId, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await commentsService.increaseDislikeCount(commentId, token);
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

// Reply comment
export const replyComment = createAsyncThunk(
	'comments/replyComment',
	async ({ replyData, commentId }, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await commentsService.replyComment(replyData, commentId, token);
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

// Delete comment
export const deleteComment = createAsyncThunk(
	'comments/deleteComment',
	async (commentId, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await commentsService.deleteComment(commentId, token);
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

// Update comment
export const updateComment = createAsyncThunk(
	'comments/updateComment',
	async ({ commentId, commentData }, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await commentsService.updateComment(commentId, commentData, token);
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

// Update reply
export const updateReply = createAsyncThunk(
	'comments/updateReply',
	async ({ replyId, commentId, replyData }, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await commentsService.updateReply(
				replyId,
				commentId,
				replyData,
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

// Delete reply
export const deleteReply = createAsyncThunk(
	'comments/deleteReply',
	async ({ commentId, replyId }, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await commentsService.deleteReply(commentId, replyId, token);
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

// Increase reply like count
export const increaseReplyLikeCount = createAsyncThunk(
	'comments/increaseReplyLikeCount',
	async ({ commentId, replyId }, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await commentsService.increaseReplyLikeCount(
				commentId,
				replyId,
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

// Increase reply dislike count
export const increaseReplyDislikeCount = createAsyncThunk(
	'comments/increaseReplyDislikeCount',
	async ({ commentId, replyId }, thunkAPI) => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			const token = storedUser.data.token;
			return await commentsService.increaseReplyDislikeCount(
				commentId,
				replyId,
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
			})
			.addCase(deleteComment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteComment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.comments = state.comments.filter(
					(comment) => comment._id !== action.payload
				);
			})
			.addCase(deleteComment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateComment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateComment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.comments = state.comments.map((comment) =>
					comment._id === action.payload._id ? action.payload : comment
				);
			})
			.addCase(updateComment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getAllProductComments.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllProductComments.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.comments = action.payload;
			})
			.addCase(getAllProductComments.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(increaseLikeCount.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(increaseLikeCount.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				const commentIndex = state.comments.findIndex(
					(comment) => comment._id === action.payload._id
				);
				if (commentIndex !== -1) {
					state.comments[commentIndex] = action.payload;
				}
			})
			.addCase(increaseLikeCount.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(increaseDislikeCount.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(increaseDislikeCount.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				const commentIndex = state.comments.findIndex(
					(comment) => comment._id === action.payload._id
				);
				if (commentIndex !== -1) {
					state.comments[commentIndex] = action.payload;
				}
			})
			.addCase(increaseDislikeCount.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(replyComment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(replyComment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				const commentIndex = state.comments.findIndex(
					(comment) => comment._id === action.payload._id
				);
				if (commentIndex !== -1) {
					state.comments[commentIndex] = action.payload;
				}
			})
			.addCase(replyComment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteReply.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteReply.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				const commentIndex = state.comments.findIndex(
					(comment) => comment._id === action.payload._id
				);
				if (commentIndex !== -1) {
					state.comments[commentIndex] = action.payload;
				}
			})
			.addCase(deleteReply.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateReply.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateReply.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				const commentIndex = state.comments.findIndex(
					(comment) => comment._id === action.payload._id
				);
				if (commentIndex !== -1) {
					state.comments[commentIndex] = action.payload;
				}
			})
			.addCase(updateReply.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(increaseReplyLikeCount.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(increaseReplyLikeCount.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				const commentIndex = state.comments.findIndex(
					(comment) => comment._id === action.payload._id
				);
				if (commentIndex !== -1) {
					state.comments[commentIndex] = action.payload;
				}
			})
			.addCase(increaseReplyLikeCount.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(increaseReplyDislikeCount.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(increaseReplyDislikeCount.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				const commentIndex = state.comments.findIndex(
					(comment) => comment._id === action.payload._id
				);
				if (commentIndex !== -1) {
					state.comments[commentIndex] = action.payload;
				}
			})
			.addCase(increaseReplyDislikeCount.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;

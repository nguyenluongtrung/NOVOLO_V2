import axios from 'axios';

const API_URL = '/novolo/api/comments/';

// Create comment
const createComment = async (commentData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, commentData, config);
	return response.data.data.comment;
};

// Get all product comments
const getAllProductComments = async (productId) => {
	const response = await axios.get(API_URL + 'product/' + productId);
	return response.data.data.comments;
};

// Increase like count
const increaseLikeCount = async (commentId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.patch(
		API_URL + 'like/' + commentId,
		null,
		config
	);
	return response.data.data.comment;
};

// Increase dislike count
const increaseDislikeCount = async (commentId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.patch(
		API_URL + 'dislike/' + commentId,
		null,
		config
	);
	return response.data.data.comment;
};

// Reply comment
const replyComment = async (replyData, commentId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(
		API_URL + 'reply/' + commentId,
		replyData,
		config
	);
	return response.data.data.comment;
};

// Delete comment
const deleteComment = async (commentId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + commentId, config);
	return response.data.data.id;
};

// Update comment
const updateComment = async (commentId, commentData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.patch(API_URL + commentId, commentData, config);
	return response.data.data.updatedComment;
};

// Update reply
const updateReply = async (replyId, commentId, replyData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.patch(
		API_URL + 'comment/' + commentId + '/reply/' + replyId,
		replyData,
		config
	);
	return response.data.data.comment;
};

// Delete reply
const deleteReply = async (commentId, replyId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(
		API_URL + 'comment/' + commentId + '/reply/' + replyId,
		config
	);
	return response.data.data.comment;
};

// Increase reply like count
const increaseReplyLikeCount = async (commentId, replyId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.patch(
		API_URL + 'like/' + commentId + '/reply/' + replyId,
		null,
		config
	);
	return response.data.data.comment;
};

// Increase reply dislike count
const increaseReplyDislikeCount = async (commentId, replyId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.patch(
		API_URL + 'dislike/' + commentId + '/reply/' + replyId,
		null,
		config
	);
	return response.data.data.comment;
};

const commentsService = {
	createComment,
	getAllProductComments,
	increaseLikeCount,
	increaseDislikeCount,
	replyComment,
	deleteComment,
	updateComment,
	deleteReply,
	increaseReplyLikeCount,
	increaseReplyDislikeCount,
	updateReply,
};

export default commentsService;

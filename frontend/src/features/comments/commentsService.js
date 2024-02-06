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

const commentsService = {
	createComment,
};

export default commentsService;

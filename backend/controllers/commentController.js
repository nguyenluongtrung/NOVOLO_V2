const asyncHandler = require('express-async-handler');
const Comment = require('./../models/commentModel');

const createComment = asyncHandler(async (req, res) => {
	const comment = await Comment.create(req.body);

	res.status(201).json({
		status: 'success',
		data: {
			comment,
		},
	});
});

const replyComment = asyncHandler(async (req, res) => {
	const comment = await Comment.findById(req.params.commentId);

	if (!comment) {
		res.status(404);
		throw new Error('Comment not found!');
	}

	comment.replies.push(req.body);
	await comment.save();

	res.status(201).json({
		status: 'success',
		data: {
			comment,
		},
	});
});

module.exports = {
	createComment,
	replyComment,
};

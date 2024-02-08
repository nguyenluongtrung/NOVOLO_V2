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

const deleteComment = asyncHandler(async (req, res) => {
	const comment = await Comment.findById(req.params.commentId);

	if (!comment) {
		res.status(404);
		throw new Error('Comment not found!');
	}

	await Comment.findByIdAndDelete(req.params.commentId);

	res.status(200).json({
		status: 'success',
		data: {
			id: req.params.commentId,
		},
	});
});

const getAllReplies = asyncHandler(async (req, res) => {
	const comment = await Comment.findById(req.params.commentId);

	if (!comment) {
		res.status(404);
		throw new Error('Comment not found!');
	}

	const replies = comment.replies;

	res.status(200).json({
		status: 'success',
		data: {
			replies,
		},
	});
});

const updateComment = asyncHandler(async (req, res) => {
	const comment = await Comment.findById(req.params.commentId);

	if (!comment) {
		res.status(404);
		throw new Error('Comment not found!');
	}

	const updatedComment = await Comment.findByIdAndUpdate(
		req.params.commentId,
		req.body,
		{ new: true }
	);

	res.status(200).json({
		status: 'success',
		data: {
			updatedComment,
		},
	});
});

const getComment = asyncHandler(async (req, res) => {
	const comment = await Comment.findById(req.params.commentId);

	if (!comment) {
		res.status(404);
		throw new Error('Comment not found!');
	}

	res.status(200).json({
		status: 'success',
		data: {
			comment,
		},
	});
});

const getAllComments = asyncHandler(async (req, res) => {
	const comments = await Comment.find({});

	res.status(200).json({
		status: 'success',
		data: {
			length: comments.length,
			comments,
		},
	});
});

const getAllProductComments = asyncHandler(async (req, res) => {
	const comments = await Comment.find({
		productId: req.params.productId,
	})
		.populate({
			path: 'userId',
			model: 'User',
		})
		.populate({
			path: 'replies.userId',
			model: 'User',
		});

	res.status(200).json({
		status: 'success',
		data: {
			length: comments.length,
			comments,
		},
	});
});

const increaseLikeCount = asyncHandler(async (req, res) => {
	const comment = await Comment.findById(req.params.commentId);

	if (!comment) {
		res.status(404);
		throw new Error('Comment not found!');
	}

	comment.likeCount = comment.likeCount + 1;

	await comment.save();

	res.status(200).json({
		status: 'success',
		data: {
			comment,
		},
	});
});

const increaseDislikeCount = asyncHandler(async (req, res) => {
	const comment = await Comment.findById(req.params.commentId);

	if (!comment) {
		res.status(404);
		throw new Error('Comment not found!');
	}

	comment.dislikeCount = comment.dislikeCount + 1;

	await comment.save();

	res.status(200).json({
		status: 'success',
		data: {
			comment,
		},
	});
});

module.exports = {
	createComment,
	replyComment,
	deleteComment,
	getAllReplies,
	updateComment,
	getComment,
	getAllComments,
	getAllProductComments,
	increaseLikeCount,
	increaseDislikeCount,
};

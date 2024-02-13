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

	const hasUserLiked = comment.likedBy.some((like) =>
		like.userId.equals(req.user._id)
	);

	const hasUserDisliked = comment.dislikedBy.some((dislike) =>
		dislike.userId.equals(req.user._id)
	);

	if (!hasUserLiked) {
		comment.likeCount = comment.likeCount + 1;
		comment.likedBy.push({ userId: req.user._id });

		if (hasUserDisliked) {
			comment.dislikeCount = comment.dislikeCount - 1;
			comment.dislikedBy = comment.dislikedBy.filter(
				(dislikedUser) => String(dislikedUser.userId) != String(req.user._id)
			);
		}

		await comment.save();

		res.status(200).json({
			status: 'success',
			data: {
				comment,
			},
		});
	} else {
		comment.likeCount = comment.likeCount - 1;
		comment.likedBy = comment.likedBy.filter(
			(likedUser) => String(likedUser.userId) != String(req.user._id)
		);

		await comment.save();

		res.status(200).json({
			status: 'success',
			data: {
				comment,
			},
		});
	}
});

const increaseDislikeCount = asyncHandler(async (req, res) => {
	const comment = await Comment.findById(req.params.commentId);

	if (!comment) {
		res.status(404);
		throw new Error('Comment not found!');
	}

	const hasUserDisliked = comment.dislikedBy.some((dislike) =>
		dislike.userId.equals(req.user._id)
	);

	const hasUserLiked = comment.likedBy.some((like) =>
		like.userId.equals(req.user._id)
	);

	if (!hasUserDisliked) {
		comment.dislikeCount = comment.dislikeCount + 1;
		comment.dislikedBy.push({ userId: req.user._id });

		if (hasUserLiked) {
			comment.likeCount = comment.likeCount - 1;
			comment.likedBy = comment.likedBy.filter(
				(likedUser) => String(likedUser.userId) != String(req.user._id)
			);
		}

		await comment.save();

		res.status(200).json({
			status: 'success',
			data: {
				comment,
			},
		});
	} else {
		comment.dislikeCount = comment.dislikeCount - 1;
		comment.dislikedBy = comment.dislikedBy.filter(
			(dislikedUser) => String(dislikedUser.userId) != String(req.user._id)
		);

		await comment.save();

		res.status(200).json({
			status: 'success',
			data: {
				comment,
			},
		});
	}
});

const increaseReplyLikeCount = asyncHandler(async (req, res) => {
	const comment = await Comment.findById(req.params.commentId);

	if (!comment) {
		res.status(404);
		throw new Error('Comment not found!');
	}

	const reply = comment.replies.find(
		(reply) => reply._id.toString() === req.params.replyId
	);

	const hasUserLiked = reply.likedBy?.some((like) =>
		like.userId.equals(req.user._id)
	);

	const hasUserDisliked = reply.dislikedBy?.some((dislike) =>
		dislike.userId.equals(req.user._id)
	);

	if (!hasUserLiked) {
		reply.likedBy.push({ userId: req.user._id });
		reply.likeCount = reply.likeCount + 1;

		if (hasUserDisliked) {
			reply.dislikedBy = reply.dislikedBy.filter(
				(likedUser) => String(likedUser.userId) != String(req.user._id)
			);
			reply.dislikeCount = reply.dislikeCount - 1;
		}
	} else {
		reply.likedBy = reply.likedBy.filter(
			(likedUser) => String(likedUser.userId) != String(req.user._id)
		);
		reply.likeCount = reply.likeCount - 1;
	}

	await comment.save();

	res.status(200).json({
		status: 'success',
		data: {
			comment,
		},
	});
});

const increaseReplyDislikeCount = asyncHandler(async (req, res) => {
	const comment = await Comment.findById(req.params.commentId);

	if (!comment) {
		res.status(404);
		throw new Error('Comment not found!');
	}

	const reply = comment.replies.find(
		(reply) => reply._id.toString() === req.params.replyId
	);

	const hasUserLiked = reply.likedBy?.some((like) =>
		like.userId.equals(req.user._id)
	);

	const hasUserDisliked = reply.dislikedBy?.some((dislike) =>
		dislike.userId.equals(req.user._id)
	);

	if (!hasUserDisliked) {
		reply.dislikedBy.push({ userId: req.user._id });
		reply.dislikeCount = reply.dislikeCount + 1;

		if (hasUserLiked) {
			reply.likedBy = reply.likedBy.filter(
				(likedUser) => String(likedUser.userId) != String(req.user._id)
			);
			reply.likeCount = reply.likeCount - 1;
		}
	} else {
		reply.dislikedBy = reply.dislikedBy.filter(
			(likedUser) => String(likedUser.userId) != String(req.user._id)
		);
		reply.dislikeCount = reply.dislikeCount - 1;
	}

	await comment.save();

	res.status(200).json({
		status: 'success',
		data: {
			comment,
		},
	});
});

const deleteReply = asyncHandler(async (req, res) => {
	const comment = await Comment.findById(req.params.commentId);

	if (!comment) {
		res.status(404);
		throw new Error('Comment not found!');
	}

	comment.replies = comment.replies.filter(
		(reply) => reply._id.toString() !== req.params.replyId
	);

	await comment.save();

	res.status(200).json({
		status: 'success',
		data: {
			comment,
		},
	});
});

const updateReply = asyncHandler(async (req, res) => {
	const comment = await Comment.findById(req.params.commentId);

	if (!comment) {
		res.status(404);
		throw new Error('Comment not found!');
	}

	comment.replies.map((reply) =>
		reply._id.toString() === req.params.replyId
			? (reply.content = req.body.content)
			: reply
	);

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
	increaseReplyLikeCount,
	increaseReplyDislikeCount,
	deleteReply,
	updateReply,
};

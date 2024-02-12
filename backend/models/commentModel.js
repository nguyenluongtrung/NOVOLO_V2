const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	content: {
		type: String,
		required: [true, 'Content is mandatory'],
	},
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: [true, 'ProductId is mandatory'],
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'UserId is mandatory'],
	},
	likeCount: {
		type: Number,
		default: 0,
	},
	likedBy: {
		type: [
			{
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
			},
		],
		default: [],
	},
	dislikeCount: {
		type: Number,
		default: 0,
	},
	dislikedBy: {
		type: [
			{
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
			},
		],
		default: [],
	},
	replies: {
		type: [
			{
				content: {
					type: String,
					required: [true, 'Reply content is mandatory'],
				},
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				likeCount: {
					type: Number,
					default: 0,
				},
				dislikeCount: {
					type: Number,
					default: 0,
				},
				likedBy: {
					type: [
						{
							userId: {
								type: mongoose.Schema.Types.ObjectId,
								ref: 'User',
							},
						},
					],
					default: [],
				},
				dislikedBy: {
					type: [
						{
							userId: {
								type: mongoose.Schema.Types.ObjectId,
								ref: 'User',
							},
						},
					],
					default: [],
				},
				date: {
					type: Date,
					default: Date.now(),
				},
			},
		],
		default: [],
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

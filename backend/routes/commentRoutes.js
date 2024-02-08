const express = require('express');
const {
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
} = require('../controllers/commentController');
const { protect } = require('../middleware/userMiddleware');
const router = express.Router();

router.route('/').get(getAllComments).post(protect, createComment);
router
	.route('/reply/:commentId')
	.get(getAllReplies)
	.post(protect, replyComment);
router
	.route('/comment/:commentId/reply/:replyId')
	.delete(protect, deleteReply)
	.patch(protect, updateReply);
router.route('/product/:productId').get(getAllProductComments);
router
	.route('/like/:commentId/reply/:replyId')
	.patch(protect, increaseReplyLikeCount);
router.route('/like/:commentId').patch(protect, increaseLikeCount);
router
	.route('/dislike/:commentId/reply/:replyId')
	.patch(protect, increaseReplyDislikeCount);
router.route('/dislike/:commentId').patch(protect, increaseDislikeCount);
router
	.route('/:commentId')
	.get(getComment)
	.delete(protect, deleteComment)
	.patch(protect, updateComment);

module.exports = router;

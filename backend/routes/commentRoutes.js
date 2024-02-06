const express = require('express');
const {
	createComment,
	replyComment,
	deleteComment,
	getAllReplies,
	updateComment,
	getComment,
	getAllComments,
} = require('../controllers/commentController');
const { protect } = require('../middleware/userMiddleware');
const router = express.Router();

router.route('/').get(getAllComments).post(protect, createComment);
router
	.route('/reply/:commentId')
	.get(getAllReplies)
	.post(protect, replyComment);
router
	.route('/:commentId')
	.get(getComment)
	.delete(protect, deleteComment)
	.patch(protect, updateComment);

module.exports = router;

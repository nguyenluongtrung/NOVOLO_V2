const express = require('express');
const {
	createComment,
	replyComment,
} = require('../controllers/commentController');
const { protect } = require('../middleware/userMiddleware');
const router = express.Router();

router.route('/').post(protect, createComment);
router.route('/:commentId').post(protect, replyComment);

module.exports = router;

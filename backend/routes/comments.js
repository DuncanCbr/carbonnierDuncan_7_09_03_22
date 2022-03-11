const express = require('express');
const router = express.Router();

const commentControllers = require('../controllers/comments');


router.get('/:postId', commentControllers.getCommentById);

router.post("/", commentControllers.createComment);


module.exports = router;
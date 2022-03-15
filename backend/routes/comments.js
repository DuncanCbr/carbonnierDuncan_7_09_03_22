const express = require('express');
const router = express.Router();
const auth = require('../midlewares/auth');

const commentControllers = require('../controllers/comments');


router.get('/:postId', commentControllers.getCommentById);

router.post("/", auth, commentControllers.createComment);


module.exports = router;
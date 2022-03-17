const express = require('express');
const router = express.Router();
const auth = require('../midlewares/auth');


const postControllers = require('../controllers/posts');


router.get("/", auth, postControllers.getAllPost);

router.get('/byId/:id', postControllers.getOnePost);

router.post("/", auth, postControllers.createPost);

module.exports = router;
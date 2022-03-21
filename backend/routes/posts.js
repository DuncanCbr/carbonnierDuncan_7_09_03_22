const express = require('express');
const router = express.Router();
const auth = require('../midlewares/auth');


const postControllers = require('../controllers/posts');


router.get("/", auth, postControllers.getAllPost);

router.get('/byId/:id', postControllers.getOnePost);

router.get('/byuserId/:id', postControllers.getPostsByUsers);

router.post("/", auth, postControllers.createPost);

router.delete("/:id", auth, postControllers.deletePost);

router.put('/title', auth, postControllers.editTitle);

router.put('/postText', auth, postControllers.editBody);

module.exports = router;
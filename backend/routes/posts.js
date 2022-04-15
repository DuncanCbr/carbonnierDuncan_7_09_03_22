const express = require('express');
const router = express.Router();
const auth = require('../midlewares/auth');
const multer = require('../midlewares/multer-config');



const postControllers = require('../controllers/posts');


router.get("/", auth, postControllers.getAllPost);

router.get('/byId/:id', postControllers.getOnePost);

router.get('/byuserId/:id', postControllers.getPostsByUsers);

router.post("/", auth, multer, postControllers.createPost);

router.delete("/:id", auth, postControllers.deletePost);

router.put('/editPost', auth, multer, postControllers.editPost);


module.exports = router;
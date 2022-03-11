const express = require('express');
const router = express.Router();

const postControllers = require('../controllers/posts');


router.get("/", postControllers.getAllPost);

router.get('/byId/:id', postControllers.getOnePost);

router.post("/", postControllers.createPost);

module.exports = router;
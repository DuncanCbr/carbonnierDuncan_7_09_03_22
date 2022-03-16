const express = require('express');
const router = express.Router();
const auth = require('../midlewares/auth');

const likesControllers = require('../controllers/likes');


router.post("/", auth, likesControllers.like);

module.exports = router;
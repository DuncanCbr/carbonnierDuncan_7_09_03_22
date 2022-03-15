const express = require('express');
const router = express.Router();
const auth = require('../midlewares/auth');

const userControllers = require('../controllers/users');


router.post("/", userControllers.createUser);
router.post("/login", userControllers.loginUser);
router.get("/auth", auth, userControllers.checkToken);

module.exports = router;
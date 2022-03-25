const express = require("express");
const router = express.Router();
const auth = require("../midlewares/auth");

const userControllers = require("../controllers/users");

router.post("/", userControllers.createUser);
router.post("/login", userControllers.loginUser);
router.get("/auth", auth, userControllers.checkToken);
router.get("/basicinfo/:id", userControllers.basicInfo);
router.get("/users", userControllers.getAllUsers);
router.put("/changepassword", auth, userControllers.editPassword);
router.delete("/deleteaccount/:id", auth, userControllers.deleteAccount);

module.exports = router;

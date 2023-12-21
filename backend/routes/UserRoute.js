const express = require("express");
const { registerUser, loginUser, logout, getUser, loginStatus, updateUser } = require("../controllers/UserController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();




router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",logout);
router.get("/getUser", protect ,getUser);
router.get("/loggedin",loginStatus);
router.patch("/updateuser",protect,updateUser);



module.exports = router
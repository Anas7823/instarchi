
const express = require("express");
const router = express.Router();
const {getAllUsers, registerUser, loginUser, updateUser, deleteUser, getUserById, getMyUser} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;

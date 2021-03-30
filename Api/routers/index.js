const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller")

router.get("/usuarios", userController.getUsers);

module.exports = router


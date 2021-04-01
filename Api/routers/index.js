const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller")

router.get("/usuarios", userController.getUsers);
router.post("/usuarios", userController.saveUsers);
router.delete("/usuarios/:idusuario", userController.deleteUsers);
router.put("/usuarios/:idusuario", userController.updateUsers);

module.exports = router


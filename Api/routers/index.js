const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller")
const randomController = require("../controllers/randomUsers.controller")

router.get("/usuarios", userController.getUsers);
router.post("/usuarios", userController.saveUsers);
router.post("/usuariosRandom", randomController.saveRandomUsers);
router.delete("/usuarios/:idusuario", userController.deleteUsers);
router.put("/usuarios/:idusuario", userController.updateUsers);

module.exports = router


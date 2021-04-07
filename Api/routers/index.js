const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller")
const randomController = require("../controllers/randomUsers.controller")
const ReportsController = require("../controllers/reports.controller");

router.get("/reportPorcenKoD", ReportsController.getReporPorcenjeKoD);
router.get("/reportPorcenPrecision", ReportsController.getReporPorcenPrecision);

router.post("/usuarios", userController.saveUsers);
router.post("/usuariosRandom", randomController.saveRandomUsers);

router.get("/usuarios", userController.getUsers);

router.delete("/usuarios/:idusuario", userController.deleteUsers);

router.put("/usuarios/:idusuario", userController.updateUsers);

module.exports = router


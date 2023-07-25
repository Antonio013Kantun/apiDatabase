// authRouter.js

const express = require("express");
const authControllers = require("../controllers/authControllers");

const router = express.Router();

// Ruta para iniciar sesión
router.post("/login", authControllers.iniciarSesion);

module.exports = router;

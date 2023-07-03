const express = require("express");
const administradoresControllers = require("../controllers/administradoresControllers");

const router = express.Router();

// !Rutas para las categorias
router.get("/", administradoresControllers.obtenerAdministradores);
router.get("/:id_administrador", administradoresControllers.obtenerAdministradoresPorId);
router.post("/", administradoresControllers.crearAdministradores);
router.delete("/:id_administrador", administradoresControllers.eliminarAdministradoresPorId);
router.put("/:id_administrador", administradoresControllers.actualizarAdministradoresPorId);

module.exports = router;
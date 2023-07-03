const express = require("express");
const categoriasControllers = require("../controllers/categoriasControllers");

const router = express.Router();

// !Rutas para las categorias
router.get("/", categoriasControllers.obtenerCategorias);
router.get("/:id_categoria", categoriasControllers.obtenerCategoriasPorId);
router.post("/", categoriasControllers.crearCategorias);
router.delete("/:id_categoria", categoriasControllers.eliminarCategoriasPorId);
router.put("/:id_categoria", categoriasControllers.actualizarCategoriasPorId);

module.exports = router;

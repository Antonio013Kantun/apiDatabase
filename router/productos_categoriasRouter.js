const express = require("express");
const productosCategoriasController = require("../controllers/productos_categoriasControllers");

const router = express.Router();

// Rutas para productos_categorias
router.get("/", productosCategoriasController.obtenerProductosCategorias);
router.get("/:id_producto_categoria", productosCategoriasController.obtenerProductosCategoriasPorId);
router.post("/", productosCategoriasController.crearProductoCategoria);
router.delete("/:id_producto_categoria", productosCategoriasController.eliminarProductoCategoriaPorId);

module.exports = router;

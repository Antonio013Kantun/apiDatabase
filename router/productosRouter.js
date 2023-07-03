const express = require("express");
const productosControllers = require("../controllers/productosControllers");

const router = express.Router();

// !Rutas para las productos
router.get("/", productosControllers.obtenerProductos);
router.get("/:id_producto", productosControllers.obtenerProductosPorId);
router.post("/", productosControllers.crearProductos);
router.delete("/:id_producto", productosControllers.eliminarProductosPorId);
router.put("/:id_producto", productosControllers.actualizarProductosPorId);

module.exports = router;
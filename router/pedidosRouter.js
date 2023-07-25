const express = require("express");
const pedidosController = require("../controllers/pedidosControllers");

const router = express.Router();

// Rutas para los pedidos
router.get("/", pedidosController.obtenerPedidos);
router.get("/:id_pedido", pedidosController.obtenerPedidoPorId);
router.post("/", pedidosController.crearPedido);
router.put("/:id_pedido", pedidosController.actualizarPedidoPorId);
router.delete("/:id_pedido", pedidosController.eliminarPedidoPorId);

module.exports = router;

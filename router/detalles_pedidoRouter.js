const express = require("express");
const detallesPedidoController = require("../controllers/detalles_PedidoControllers");

const router = express.Router();

// Rutas para los detalles del pedido
router.get("/", detallesPedidoController.obtenerDetallesPedido);
router.get("/:id_detalle", detallesPedidoController.obtenerDetallesPedidoPorId);
router.post("/", detallesPedidoController.crearDetallePedido);
router.put("/:id_detalle", detallesPedidoController.actualizarDetallePedidoPorId);
router.delete("/:id_detalle", detallesPedidoController.eliminarDetallePedidoPorId);

module.exports = router;

const express = require("express");
const clientesControllers = require("../controllers/clientesControllers");

const router = express.Router();

// !Rutas para los clientes
router.get("/", clientesControllers.obtenerClientes);
router.get("/:id_cliente", clientesControllers.obtenerClientesPorId);
router.post("/", clientesControllers.crearClientes);
router.delete("/:id_cliente", clientesControllers.eliminarClientesPorId);
router.put("/:id_cliente", clientesControllers.actualizarClientesPorId);

module.exports = router;


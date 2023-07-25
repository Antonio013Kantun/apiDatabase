const connection = require("../database");

const obtenerDetallesPedido = (req, res) => {
  connection.query("SELECT * FROM detalles_pedido", (error, results) => {
    if (error) {
      console.error("Error al obtener los detalles del pedido", error);
      res.status(500).json({
        error: "Error al obtener los detalles del pedido",
      });
    } else {
      res.json(results);
    }
  });
};

const obtenerDetallesPedidoPorId = (req, res) => {
  const id = req.params.id_detalle;
  connection.query(
    "SELECT * FROM detalles_pedido WHERE id_detalle = ?",
    [id],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: "Ocurrió un error al obtener el detalle del pedido" });
      } else if (results.length === 0) {
        res.status(500).json({ error: "El detalle del pedido no fue encontrado" });
      } else {
        res.json(results[0]);
      }
    }
  );
};

const crearDetallePedido = (req, res) => {
  const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
  connection.query(
    "INSERT INTO detalles_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)",
    [id_pedido, id_producto, cantidad, precio_unitario],
    (error, results) => {
      if (error) {
        console.error("Error al agregar el detalle del pedido", error);
        res.status(500).json({
          error: "Error al agregar el detalle del pedido",
        });
      } else {
        res.json({ message: "Detalle del pedido agregado" });
      }
    }
  );
};

const actualizarDetallePedidoPorId = (req, res) => {
  const id = req.params.id_detalle;
  const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
  connection.query(
    "UPDATE detalles_pedido SET id_pedido = ?, id_producto = ?, cantidad = ?, precio_unitario = ? WHERE id_detalle = ?",
    [id_pedido, id_producto, cantidad, precio_unitario, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar el detalle del pedido", error);
        res.status(500).json({ error: "Error al actualizar el detalle del pedido" });
      } else {
        res.json({ message: "El detalle del pedido fue actualizado correctamente" });
      }
    }
  );
};

const eliminarDetallePedidoPorId = (req, res) => {
  const id = req.params.id_detalle;
  connection.query("DELETE FROM detalles_pedido WHERE id_detalle = ?", [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Ocurrió un error al eliminar el detalle del pedido" });
    } else {
      res.json({ message: "El detalle del pedido fue eliminado correctamente" });
    }
  });
};

module.exports = {
  obtenerDetallesPedido,
  obtenerDetallesPedidoPorId,
  crearDetallePedido,
  actualizarDetallePedidoPorId,
  eliminarDetallePedidoPorId,
};

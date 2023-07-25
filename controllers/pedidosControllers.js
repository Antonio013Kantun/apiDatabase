const connection = require("../database");

const obtenerPedidos = (req, res) => {
  connection.query("SELECT * FROM pedidos", (error, results) => {
    if (error) {
      console.error("Error al obtener los pedidos", error);
      res.status(500).json({
        error: "Error al obtener los pedidos",
      });
    } else {
      res.json(results);
    }
  });
};

const obtenerPedidoPorId = (req, res) => {
  const id = req.params.id_pedido;
  connection.query(
    "SELECT * FROM pedidos WHERE id_pedido = ?",
    [id],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: "Ocurrió un error al obtener el pedido" });
      } else if (results.length === 0) {
        res.status(500).json({ error: "El pedido no fue encontrado" });
      } else {
        res.json(results[0]);
      }
    }
  );
};

const crearPedido = (req, res) => {
  const { id_cliente, fecha, total } = req.body;
  connection.query(
    "INSERT INTO pedidos (id_cliente, fecha, total) VALUES (?, ?, ?)",
    [id_cliente, fecha, total],
    (error, results) => {
      if (error) {
        console.error("Error al agregar el pedido", error);
        res.status(500).json({
          error: "Error al agregar el pedido",
        });
      } else {
        res.json({ message: "Pedido agregado" });
      }
    }
  );
};

const actualizarPedidoPorId = (req, res) => {
  const id = req.params.id_pedido;
  const { id_cliente, fecha, total } = req.body;
  connection.query(
    "UPDATE pedidos SET id_cliente = ?, fecha = ?, total = ? WHERE id_pedido = ?",
    [id_cliente, fecha, total, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar el pedido", error);
        res.status(500).json({ error: "Error al actualizar el pedido" });
      } else {
        res.json({ message: "El pedido fue actualizado correctamente" });
      }
    }
  );
};

const eliminarPedidoPorId = (req, res) => {
  const id = req.params.id_pedido;
  connection.query("DELETE FROM pedidos WHERE id_pedido = ?", [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Ocurrió un error al eliminar el pedido" });
    } else {
      res.json({ message: "El pedido fue eliminado correctamente" });
    }
  });
};

module.exports = {
  obtenerPedidos,
  obtenerPedidoPorId,
  crearPedido,
  actualizarPedidoPorId,
  eliminarPedidoPorId,
};

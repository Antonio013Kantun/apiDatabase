const connection = require("../database");

const obtenerProductosCategorias = (req, res) => {
  connection.query("SELECT * FROM productos_categorias", (error, results) => {
    if (error) {
      console.error("Error al obtener los productos_categorias", error);
      res.status(500).json({
        error: "Error al obtener los productos_categorias",
      });
    } else {
      res.json(results);
    }
  });
};

const obtenerProductosCategoriasPorId = (req, res) => {
  const id = req.params.id_producto_categoria;
  connection.query(
    "SELECT * FROM productos_categorias WHERE id_producto_categoria = ?",
    [id],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: "Ocurrió un error al obtener el producto_categoria" });
      } else if (results.length === 0) {
        res.status(500).json({ error: "El producto_categoria no fue encontrado" });
      } else {
        res.json(results[0]);
      }
    }
  );
};

const crearProductoCategoria = (req, res) => {
  const { id_producto, id_categoria } = req.body;
  connection.query(
    "INSERT INTO productos_categorias (id_producto, id_categoria) VALUES (?, ?)",
    [id_producto, id_categoria],
    (error, results) => {
      if (error) {
        console.error("Error al agregar el producto_categoria", error);
        res.status(500).json({
          error: "Error al agregar el producto_categoria",
        });
      } else {
        res.json({ message: "Producto_Categoria agregada" });
      }
    }
  );
};

const eliminarProductoCategoriaPorId = (req, res) => {
  const id = req.params.id_producto_categoria;
  connection.query(
    "DELETE FROM productos_categorias WHERE id_producto_categoria = ?",
    [id],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: "Ocurrió un error al eliminar el producto_categoria" });
      } else {
        res.json({ message: "El producto_categoria fue eliminado correctamente" });
      }
    }
  );
};

module.exports = {
  obtenerProductosCategorias,
  obtenerProductosCategoriasPorId,
  crearProductoCategoria,
  eliminarProductoCategoriaPorId,
};

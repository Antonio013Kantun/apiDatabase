const connection = require("../database");

const obtenerProductos = (req, res) => {
  connection.query("SELECT * FROM productos", (error, results) => {
    if (error) {
      console.error("Errors al obtener productos", error);
      res.status(500).json({
        error: "Error al obtener productos",
      });
    } else {
      res.json(results);
    }
  });
};


const obtenerProductosPorId = (req, res) => {
  const id = req.params.id_producto;
  connection.query("SELECT * FROM productos WHERE id_producto =?", [id], (error, results) => {
    if (error) {
      res.status(500).json({error: "Ocurrio un error al obtener el producto"});
    } else if(results.length === 0){
      res.status(500).json({error:"El producto no fue encontrado"});
    }
    else{
      res.json(results[0]);
    }
  });
};







const crearProductos = (req, res) => {
const { nombre, descripcion, precio, imagen, stock } = req.body;

  connection.query(
    "INSERT INTO productos (nombre, descripcion, precio, imagen, stock) VALUES (?,?,?,?,?)",
    [nombre, descripcion, precio, imagen, stock],
    (error, results) => {
      if (error) {
        console.error("Errors al agregar producto", error);
        res.status(500).json({
          error: "Error al agregar producto",
        });
      } else {
        res.json({ message: "Producto agregada" });
      }
    }
  );
};


const actualizarProductosPorId = (req, res) => {
  const id = req.params.id_producto;
  const { nombre, descripcion, precio, imagen, stock } = req.body;
  connection.query(
    "UPDATE productos SET nombre =?, descripcion = ?, precio=?, imagen=?, stock=? WHERE id_producto =?",[nombre, descripcion, precio, imagen, stock, id],(error, results) => {
      if (error) {
        console.error("Error al actualizar producto", error);
        res.status(500).json({error: "Error al actualizar producto"});
      }else{
        res.json({message: "El producto fue actualizada correctamente"});
      }
    }
  );
};

const eliminarProductosPorId = (req, res) => {
  const id = req.params.id_producto;
  connection.query("DELETE FROM productos WHERE id_producto =?", [id], (error, results) => {
    if (error) {
      res.status(500).json({error: "Ocurrio un error al eliminar el producto"});
    } else{
      res.json({message:"El producto fue eliminada correctamente"});
    }
  });
}

module.exports = {
  obtenerProductos,
  obtenerProductosPorId,
  crearProductos,
  actualizarProductosPorId,
  eliminarProductosPorId,
};
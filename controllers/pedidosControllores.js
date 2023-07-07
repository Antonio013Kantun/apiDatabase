// const connection = require("../database");

// const obtenerProductos = (req, res) => {
//   connection.query("SELECT * FROM pedidos", (error, results) => {
//     if (error) {
//       console.error("Error al obtener pedidos", error);
//       res.status(500).json({
//         error: "Error al obtener pedidos",
//       });
//     } else {
//       res.json(results);
//     }
//   });
// };


// const obtenerProductosPorId = (req, res) => {
//   const id = req.params.id_pedido;
//   connection.query("SELECT * FROM pedidos WHERE id_pedido =?", [id], (error, results) => {
//     if (error) {
//       res.status(500).json({error: "Ocurrio un error al obtener el pedido"});
//     } else if(results.length === 0){
//       res.status(500).json({error:"El pedido no fue encontrado"});
//     }
//     else{
//       res.json(results[0]);
//     }
//   });
// };







// const crearProductos = (req, res) => {
// const { nombre, descripcion, precio, imagen } = req.body;

//   connection.query(
//     "INSERT INTO pedidos (nombre, descripcion, precio, imagen) VALUES (?,?,?,?)",
//     [nombre, descripcion, precio, imagen],
//     (error, results) => {
//       if (error) {
//         console.error("Errors al agregar producto", error);
//         res.status(500).json({
//           error: "Error al agregar producto",
//         });
//       } else {
//         res.json({ message: "Producto agregada" });
//       }
//     }
//   );
// };


// const actualizarProductosPorId = (req, res) => {
//   const id = req.params.id_producto;
//   const { nombre, descripcion, precio, imagen } = req.body;
//   connection.query(
//     "UPDATE productos SET nombre =?, descripcion = ?, precio=?, imagen=? WHERE id_producto =?",[nombre, descripcion, precio, imagen,id],(error, results) => {
//       if (error) {
//         console.error("Error al actualizar producto", error);
//         res.status(500).json({error: "Error al actualizar producto"});
//       }else{
//         res.json({message: "El producto fue actualizada correctamente"});
//       }
//     }
//   );
// };

// const eliminarProductosPorId = (req, res) => {
//   const id = req.params.id_producto;
//   connection.query("DELETE FROM productos WHERE id_producto =?", [id], (error, results) => {
//     if (error) {
//       res.status(500).json({error: "Ocurrio un error al eliminar el producto"});
//     } else{
//       res.json({message:"El producto fue eliminada correctamente"});
//     }
//   });
// }

// module.exports = {
//   obtenerProductos,
//   obtenerProductosPorId,
//   crearProductos,
//   actualizarProductosPorId,
//   eliminarProductosPorId,
// };
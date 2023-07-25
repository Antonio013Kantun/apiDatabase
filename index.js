// !dependencias
const express = require("express");
const cors = require("cors");




const categoriasRouter = require("./router/categoriasRouter");
const productosRouter = require("./router/productosRouter");
const pedidosRouter = require("./router/pedidosRouter");
const productosCategoriasRouter = require("./router/productos_categoriasRouter");
const detallesPedidoRouter = require("./router/detalles_pedidoRouter");
const loginRouter = require("./router/authRouter");

const clientesRouter = require("./router/clientesRouter");
const administradoresRouter = require("./router/administradoresRouter");

/* app va a tener todos los atributos y metodos de 
express */

const app = express();

app.use(cors());

app.use(express.json());


// app.use(administradoresRouter);
// app.use(clientesRouter);
// Ruta al Router
app.use("/categorias", categoriasRouter);
app.use("/productos", productosRouter);
app.use("/pedidos", pedidosRouter);
app.use("/clientes", clientesRouter);
app.use("/administradores", administradoresRouter);
app.use("/productosCategorias", productosCategoriasRouter);
app.use("/detallesPedido", detallesPedidoRouter);
app.use(loginRouter);



app.get("/", (req, res) => {
  res.send(`<h1>Hola pikachu</h1>`);
});

app.listen(3001, () => {
  console.log("API escuchando por el puerto 3001");
});
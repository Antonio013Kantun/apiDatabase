// !dependencias
const express = require("express");
const cors = require("cors");

const categoriasRouter = require("./router/categoriasRouter");
const categoriasRouter = require("./router/productosRouter");
/* app va a tener todos los atributos y metodos de 
express */

const app = express();

app.use(cors());

app.use(express.json());

// Ruta al Router
app.use("/categorias", categoriasRouter);
app.use("/productos", categoriasRouter);

app.get("/", (req, res) => {
  res.send(`<h1>Hola pikachu</h1>`);
});

app.listen(3001, () => {
  console.log("API escuchando por el puerto 3001");
});
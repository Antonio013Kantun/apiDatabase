const connection = require("../database");

const obtenerAdministradores = (req, res) => {
  connection.query("SELECT * FROM administradores", (error, results) => {
    if (error) {
      console.error("Error al obtener administradores", error);
      res.status(500).json({
        error: "Error al obtener administradores",
      });
    } else {
      res.json(results);
    }
  });
};


const obtenerAdministradoresPorId = (req, res) => {
  const id = req.params.id_administrador;
  connection.query("SELECT * FROM administradores WHERE id_administrador =?", [id], (error, results) => {
    if (error) {
      res.status(500).json({error: "Ocurrio un error al obtener el administrador"});
    } else if(results.length === 0){
      res.status(500).json({error:"El administrador no fue encontrado"});
    }
    else{
      res.json(results[0]);
    }
  });
};







const crearAdministradores = (req, res) => {
  const { nombre, email,contrasena } = req.body;
  connection.query(
    "INSERT INTO administradores (nombre, email, contrasena) VALUES (?,?,?)",
    [nombre, email, contrasena],
    (error, results) => {
      if (error) {
        console.error("Error al agregar administradores", error);
        res.status(500).json({
          error: "Error al agregar administrador",
        });
      } else {
        res.json({ message: "Administrador agregada" });
      }
    }
  );
};


const actualizarAdministradoresPorId = (req, res) => {
  const id = req.params.id_administrador;
  const { nombre, email, contrasena } = req.body;
  connection.query(
    "UPDATE administradores SET nombre =?, email=?, contrasena=? WHERE id_administrador =?",[nombre, email, contrasena, id],(error, results) => {
      if (error) {
        console.error("Error al actualizar administrador", error);
        res.status(500).json({error: "Error al actualizar administrador"});
      }else{
        res.json({message: "El administrador fue actualizada correctamente"});
      }
    }
  );
};

const eliminarAdministradoresPorId = (req, res) => {
  const id = req.params.id_administrador;
  connection.query("DELETE FROM administradores WHERE id_administrador =?", [id], (error, results) => {
    if (error) {
      res.status(500).json({error: "Ocurrio un error al eliminar el administrador"});
    } else{
      res.json({message:"El administrador fue eliminada correctamente"});
    }
  });
}

module.exports = {
  obtenerAdministradores,
  obtenerAdministradoresPorId,
  crearAdministradores,
  actualizarAdministradoresPorId,
  eliminarAdministradoresPorId,
};
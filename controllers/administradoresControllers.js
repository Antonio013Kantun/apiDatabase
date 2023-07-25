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

// const bcrypt = require('bcrypt');


// const crearAdministradores = (req, res) => {
//   const { nombre, email, contrasena } = req.body;
//   const saltRounds = 10;

//   bcrypt.hash(contrasena, saltRounds, (error, hash) => {
//     if (error) {
//       console.error('Error al generar el hash de la contraseña', error);
//       return res.status(500).json({ error: 'Error al agregar administrador' });
//     }

//     // Insertar el nuevo administrador en la base de datos con el hash generado
//     connection.query(
//       'INSERT INTO administradores (nombre, email, contrasena) VALUES (?, ?, ?)',
//       [nombre, email, hash], // Utiliza el hash generado en lugar de la contraseña en texto claro
//       (error, results) => {
//         if (error) {
//           console.error('Error al agregar administrador', error);
//           return res.status(500).json({ error: 'Error al agregar administrador' });
//         } else {
//           res.json({ message: 'Administrador agregado correctamente' });
//         }
//       }
//     );
//   });
// };


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


const iniciarSesion = (req, res) => {
  const { email, contrasena } = req.body;
  connection.query(
    "SELECT * FROM administradores WHERE email = ? AND contrasena = ?",
    [email, contrasena],
    (error, results) => {
      if (error) {
        console.error("Error al iniciar sesión", error);
        res.status(500).json({ error: "Error al iniciar sesión" });
      } else if (results.length === 0) {
        res.status(401).json({ error: "Credenciales inválidas" });
      } else {
        // Aquí podrías implementar la lógica para generar tokens de autenticación (por ejemplo, usando JWT) y devolverlo en la respuesta.
        // Pero para simplificar, en este ejemplo solo devolveremos un mensaje de éxito.
        res.json({ message: "Inicio de sesión exitoso" });
      }
    }
  );
};


// const iniciarSesion = (req, res) => {
//   const { email, contrasena } = req.body;
//   connection.query(
//     "SELECT * FROM administradores WHERE email = ?",
//     [email],
//     (error, results) => {
//       if (error) {
//         console.error("Error al iniciar sesión", error);
//         res.status(500).json({ error: "Error al iniciar sesión" });
//       } else if (results.length === 0) {
//         res.status(401).json({ error: "Credenciales inválidas" });
//       } else {
//         // Comparar la contraseña ingresada con el hash almacenado en la base de datos
//         const hash = results[0].contrasena;
//         bcrypt.compare(contrasena, hash, (err, isMatch) => {
//           if (err) {
//             console.error("Error al comparar contraseñas", err);
//             res.status(500).json({ error: "Error al iniciar sesión" });
//           } else if (isMatch) {
//             // Contraseña válida, aquí podrías generar un token de autenticación (por ejemplo, usando JWT) y devolverlo en la respuesta.
//             // Pero para simplificar, en este ejemplo solo devolveremos un mensaje de éxito.
//             res.json({ message: "Inicio de sesión exitoso" });
//           } else {
//             // Contraseña incorrecta
//             res.status(401).json({ error: "Credenciales inválidas" });
//           }
//         });
//       }
//     }
//   );
// };

module.exports = {
  obtenerAdministradores,
  obtenerAdministradoresPorId,
  crearAdministradores,
  actualizarAdministradoresPorId,
  eliminarAdministradoresPorId,
  iniciarSesion,
};
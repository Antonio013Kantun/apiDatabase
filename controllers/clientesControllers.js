const connection = require("../database");

const obtenerClientes = (req, res) => {
  connection.query("SELECT * FROM clientes", (error, results) => {
    if (error) {
      console.error("Error al obtener clientes", error);
      res.status(500).json({
        error: "Error al obtener clientes",
      });
    } else {
      res.json(results);
    }
  });
};


const obtenerClientesPorId = (req, res) => {
  const id = req.params.id_cliente;
  connection.query("SELECT * FROM clientes WHERE id_cliente =?", [id], (error, results) => {
    if (error) {
      res.status(500).json({error: "Ocurrio un error al obtener el cliente"});
    } else if(results.length === 0){
      res.status(500).json({error:"El cliente no fue encontrado"});
    }
    else{
      res.json(results[0]);
    }
  });
};



const crearClientes = (req, res) => {
const { nombre, email, contrasena, direccion, ciudad, estado, pais } = req.body;

  connection.query(
    "INSERT INTO clientes (nombre, email, contrasena, direccion, ciudad, estado, pais) VALUES (?,?,?,?,?,?,?)",
    [nombre, email, contrasena, direccion, ciudad, estado, pais],
    (error, results) => {
      if (error) {
        console.error("Errors al agregar cliente", error);
        res.status(500).json({
          error: "Error al agregar cliente",
        });
      } else {
        res.json({ message: "Cliente agregada" });
      }
    }
  );
};


// const bcrypt = require('bcrypt');


// const crearClientes = (req, res) => {
//   const { nombre, email, contrasena, direccion, ciudad, estado, pais } = req.body;
//   const saltRounds = 10;

//   bcrypt.hash(contrasena, saltRounds, (error, hash) => {
//     if (error) {
//       console.error('Error al generar el hash de la contraseña', error);
//       return res.status(500).json({ error: 'Error al agregar cliente' });
//     }

//     // Insertar el nuevo cliente en la base de datos con el hash generado
//     connection.query(
//       'INSERT INTO clientes (nombre, email, contrasena, direccion, ciudad, estado, pais) VALUES (?, ?, ?, ?, ?, ?, ?)',
//       [nombre, email, hash, direccion, ciudad, estado, pais], // Utiliza el hash generado en lugar de la contraseña en texto claro
//       (error, results) => {
//         if (error) {
//           console.error('Error al agregar cliente', error);
//           return res.status(500).json({ error: 'Error al agregar cliente' });
//         } else {
//           res.json({ message: 'Cliente agregado correctamente' });
//         }
//       }
//     );
//   });
// };


const actualizarClientesPorId = (req, res) => {
  const id = req.params.id_cliente;
  const { nombre, email, contrasena, direccion, ciudad, estado, pais } = req.body;
  connection.query(
    "UPDATE clientes SET nombre =?, email = ?, contrasena=?, direccion=?, ciudad=?, estado=?, pais=? WHERE id_cliente =?",[nombre, email, contrasena, direccion, ciudad, estado, pais, id],(error, results) => {
      if (error) {
        console.error("Error al actualizar cliente", error);
        res.status(500).json({error: "Error al actualizar cliente"});
      }else{
        res.json({message: "El cliente fue actualizada correctamente"});
      }
    }
  );
};

const eliminarClientesPorId = (req, res) => {
  const id = req.params.id_cliente;
  connection.query("DELETE FROM clientes WHERE id_cliente =?", [id], (error, results) => {
    if (error) {
      res.status(500).json({error: "Ocurrio un error al eliminar el cliente"});
    } else{
      res.json({message:"El cliente fue eliminada correctamente"});
    }
  });
}


const iniciarSesionCliente = (req, res) => {
  const { email, contrasena } = req.body;
  connection.query(
    "SELECT * FROM clientes WHERE email = ? AND contrasena = ?",
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


// const bcrypt = require('bcrypt');

// const iniciarSesionCliente = (req, res) => {
//   const { email, contrasena } = req.body;
//   connection.query(
//     "SELECT * FROM clientes WHERE email = ?",
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
//             res.json({ message: "Inicio de sesión exitoso como cliente" });
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
  obtenerClientes,
  obtenerClientesPorId,
  crearClientes,
  actualizarClientesPorId,
  eliminarClientesPorId,
  iniciarSesionCliente, 
};
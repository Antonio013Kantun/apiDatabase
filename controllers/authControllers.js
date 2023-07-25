
const bcrypt = require('bcrypt');
const connection = require("../database");

const iniciarSesion = (req, res) => {
  const { email, contrasena } = req.body;

  // Verificar si el usuario es administrador
  connection.query(
    "SELECT * FROM administradores WHERE email = ?",
    [email],
    (error, resultsAdmin) => {
      if (error) {
        console.error("Error al iniciar sesión como administrador", error);
        return res.status(500).json({ error: "Error al iniciar sesión" });
      }

      if (resultsAdmin.length === 1) {
        const admin = resultsAdmin[0];
        bcrypt.compare(contrasena, admin.contrasena, (err, isMatch) => {
          if (err) {
            console.error("Error al verificar la contraseña", err);
            return res.status(500).json({ error: "Error al iniciar sesión" });
          }

          if (isMatch) {
            // Contraseña válida, usuario es administrador
            return res.json({ message: "Sesión iniciada correctamente como administrador" });
          } else {
            // Contraseña incorrecta
            return res.status(401).json({ error: "Credenciales incorrectas" });
          }
        });
      } else {
        // Si no es administrador, verificar si es cliente
        connection.query(
          "SELECT * FROM clientes WHERE email = ?",
          [email],
          (error, resultsCliente) => {
            if (error) {
              console.error("Error al iniciar sesión como cliente", error);
              return res.status(500).json({ error: "Error al iniciar sesión" });
            }

            if (resultsCliente.length === 1) {
              const cliente = resultsCliente[0];
              bcrypt.compare(contrasena, cliente.contrasena, (err, isMatch) => {
                if (err) {
                  console.error("Error al verificar la contraseña", err);
                  return res.status(500).json({ error: "Error al iniciar sesión" });
                }

                if (isMatch) {
                  // Contraseña válida, usuario es cliente
                  return res.json({ message: "Sesión iniciada correctamente como cliente" });
                } else {
                  // Contraseña incorrecta
                  return res.status(401).json({ error: "Credenciales incorrectas" });
                }
              });
            } else {
              // Si no se encuentra el usuario en ninguna tabla, credenciales incorrectas
              return res.status(401).json({ error: "Credenciales incorrectas" });
            }
          }
        );
      }
    }
  );
};

module.exports = {
  iniciarSesion,
};

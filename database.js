const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce',
});

connection.connect((error)=>{
    if (error){
        console.error(" Error al conectar la base de datos",error);
    }else{
        console.log("Conexion exitosa");
    }
});

module.exports = connection;
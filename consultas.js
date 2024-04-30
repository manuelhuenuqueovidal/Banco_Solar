//Importación pool.
const pool = require("./config")

//Funcion para verificar la conexion a la base de datos
const conectarDB = async () => {
    try {
        const res = await pool.query(`SELECT NOW()`);
        console.log("Conexion exitosa a la base de datos, fecha y hora actuales:", res.rows[0]);
    } catch (error) {
        console.error("Error al conectar a la Base de datos", error);
    }
}
//Llamar a la funcion de conectarDB
conectarDB();

//Insertar
const insertar = async (nombre, balance) => {
    try {
      const { rows } = await pool.query(
        "INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *",
        [nombre, balance]
      );
      return rows[0]; // Devuelve el usuario insertado
    } catch (error) {
      console.error("Error al insertar", error);
      throw error;
    }
  };

 //Consultas.
const consultar = async () => {
    const result = await pool.query("SELECT * FROM usuarios");
    return result.rows;
};

//Editar.
const editar = async (id, nombre, balance) => {
    try {
      const result = await pool.query(
        "UPDATE usuarios SET nombre = $2, balance = $3 WHERE id = $1 RETURNING *",
        [id, nombre, balance]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error al editar usuario en la base de datos:", error);
      throw error;
    }
  };

  //Eliminar.
const eliminar = async (id) => {
const result = await pool.query( `DELETE FROM usuarios WHERE id = '${id}'`
);
return result;
};

 // Transferir monto de un usuario a otro.
 const transferir = async (emisor, receptor, monto) => {
  try {
    await pool.query("BEGIN");
    // Actualizar el balance del emisor
    await pool.query("UPDATE usuarios SET balance = balance - $1 WHERE id = $2", [monto, emisor]);
    // Actualizar el balance del receptor
    await pool.query("UPDATE usuarios SET balance = balance + $1 WHERE id = $2", [monto, receptor]);
    // Insertar la transferencia en la tabla transferencias
    await pool.query("INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW())", [emisor, receptor, monto]);
    await pool.query("COMMIT");
    console.log("Transferencia realizada con éxito:", monto, "de", emisor, "a", receptor);
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error al transferir:", error);
    throw error;
  }
};


//Consultas.
const consultarTransfer = async () => {
try {
    const result = await pool.query("SELECT * FROM transferencias");
    return result.rows;    
} catch (error) {
    console.error("Error al cnsultar Transferencias", error)
}
};



//Exportaciones
module.exports  = { insertar, consultar, editar, eliminar, transferir, consultarTransfer};
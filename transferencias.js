//Consulta de traspaso existosa de fondos.
// (async () => {
//     await pool.query("BEGIN");
//     // Paso 1
//     const descontar =
//       "UPDATE usuarios SET saldo = saldo - 2000 WHERE email = 'yuki_whobrey@aol.com' RETURNING *";
//     const descuento = await pool.query(descontar);
//     // Paso 2
//     const acreditar =
//       "UPDATE usuarios SET saldo = saldo + 2000 WHERE email = 'fletcher.flosi@yahoo.com' RETURNING *";
//     const acreditacion = await pool.query(acreditar);
//     // Paso 3
//     console.log("Descuento realizado con éxito: ", descuento.rows[0]);
//     console.log("Acreditación realizada con éxito: ", acreditacion.rows[0]);
//     await pool.query("COMMIT");
//   })();


  // Transferir monto de un usuario a otro
const transferir = async (emisor, receptor, monto) => {
    try {
      await pool.query("BEGIN");
      await pool.query("UPDATE usuarios SET balance = balance - $1 WHERE nombre = $2", [monto, emisor]);
      await pool.query("UPDATE usuarios SET balance = balance + $1 WHERE nombre = $2", [monto, receptor]);
      await pool.query("INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW())", [emisor, receptor, monto]);
      await pool.query("COMMIT");
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error("Error al transferir:", error);
      throw error;
    }
};
  
 //Consultas.
 const consultarTransfer = async () => {
  const result = await pool.query("SELECT * FROM transferencias");
  return result.rows;
};



//
  //module.exports = { transferir, consultarTransfer }
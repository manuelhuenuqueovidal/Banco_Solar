//Servidor Express. 
const express = require('express');
const app = express();
//Importar constantes.
const { insertar, consultar, editar, eliminar, transferir, consultarTransfer } = require("./consultas");

app.listen(3000 , console.log("Servidor arriba. 👍"))

//Usar Json.
app.use(express.json())

//Ruta por defecto.
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//Ruta post
app.post("/usuario", async (req, res) => {
    try {
        const {nombre, balance} = req.body;
        console.log(req.body)
        const respuesta = await insertar(nombre, balance);
        res.status(201).json(respuesta);
    } catch (error) {
        res.status(500).json({ error: "Algo salió mal 🙀"});
    }
});

//Ruta de consultas.
app.get("/usuarios", async (req, res) => {
    try {
        const registros = await consultar();
        res.json(registros);
    } catch (error) {
        res.status(500).send("Algo salió mal 🙀")
    }
});

//Ruta para editar.
app.put("/usuario", async (req, res) => {
    try {
      const { id, nombre, balance } = req.body;
      const usuarioEditado = await editar(id, nombre, balance);
      res.status(200).json(usuarioEditado);
    } catch (error) {
      console.error("Error al editar usuario:", error);
      res.status(500).json({ error: "Error al editar usuario" });
    }
});

//Ruta para eliminar.
app.delete("/usuario", async (req, res) =>{
    try {
        const { id } = req.query
        const respuesta = await eliminar(id)
        res.json(respuesta)
    } catch (error) {
        res.status(500).send("Algo salió mal 🙀")
    }
});

//Ruta para realizar una transferencia
app.post("/transferencia", async (req, res) => {
    try {
      const { emisor, receptor, monto } = req.body;
      // Llamar a la función para realizar la transferencia
      await transferir(emisor, receptor, monto);
      res.status(200).json({ message: "Transferencia realizada con éxito" });
    } catch (error) {
      console.error("Error al realizar la transferencia:", error);
      res.status(500).json({ error: "Error al realizar la transferencia" });
    }
});

//Ruta para obtener todas las transferencias.
app.get("/transferencias", async (req, res) => {
    try {
        const registros = await consultarTransfer();
        res.json(registros);
    } catch (error) {
        res.status(500).send("Algo salió mal 🙀")
    }
});
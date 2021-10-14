const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

// crear servidor
const app = express();

// Base de datos
dbConnection();

//Configurar CORS
app.use(cors());

// directorio publico
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());



// Rutas / auth // crear, login, renew
// CRUD

app.use("/api/auth", require("./routes/auth"));
app.use("/api/preRegistro", require("./routes/preRegistro"));


app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto " + process.env.PORT);
});

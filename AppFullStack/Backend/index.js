const express = require("express");
const app = express()
const cors = require('cors');

require("./base-orm/sqlite-init");  // crear base si no existe

/* ---------------------------------------------------------------- */
// controlar ruta
app.get("/", (req, res) => {
  res.send("TPI Backend");
});

app.use(express.json()); // para poder leer json en el body

// Configuración de CORS
app.use(cors());

// Crear ruta para cada entidad
const videojuegosRouter = require("./routes/videojuegos");
app.use(videojuegosRouter);

const clientesRouter = require("./routes/clientes");
app.use(clientesRouter);

const empleadosRouter = require("./routes/empleados");
app.use(empleadosRouter);

const plataformasRouter = require("./routes/plataformas");
app.use(plataformasRouter);

const categoriasRouter = require("./routes/categorias");
app.use(categoriasRouter);

const seguridadRouter = require("./routes/seguridad");
app.use(seguridadRouter);

/* ---------------------------------------------------------------- */
// levantar servidor
if (!module.parent) {   // si no es llamado por otro modulo, es decir, si es el modulo principal -> levantamos el servidor
  const port = process.env.PORT || 4000;   // en produccion se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}

module.exports = app;  // para poder testearlo
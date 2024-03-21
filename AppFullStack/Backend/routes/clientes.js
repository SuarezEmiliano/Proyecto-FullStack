const express = require("express");
const router = express.Router();
const auth = require("../seguridad/auth");
const { Op, ValidationError } = require("sequelize");

const db = require("../base-orm/sequelize-init");

// ----------------------------------------------------------------
router.get("/api/clientes", async function (req, res, next) {
  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }

  // Paginación
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.clientes.findAndCountAll({
    attributes: [
      "Legajo",
      "Nombre",
      "FechaAlta",
    ],
    order: [["Nombre", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });
  
  return res.json({ Items: rows, RegistrosTotal: count });
});
// ----------------------------------------------------------------

router.get("/api/clientes", async function (req, res, next) {
  let data = await db.clientes.findAll({
    attributes: ["Legajo", "Nombre", "FechaAlta"],
  });
  res.json(data);
});

router.get("/api/clientes/:legajo", async function (req, res, next) {
    let data = await db.clientes.findAll({
      attributes: ["Legajo", "Nombre", "FechaAlta"],
      where: { Legajo: req.params.legajo },
    });
    if (data.length > 0 ) res.json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
  });

// Crear CRUD = ABM con validacion de errores

// Crear ruta para crear un cliente
router.post("/api/clientes", async function (req, res, next) {
  try {
    let data = await db.clientes.create({
      Nombre: req.body.Nombre,
      FechaAlta: req.body.FechaAlta,
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ mensaje: error.message });
    } else {
      res.status(500).json({ mensaje: error.message });
    }
  }
});

// Crear ruta para modificar un cliente
router.put("/api/clientes/:legajo", async function (req, res, next) {
  try {
    let data = await db.clientes.update(req.body, {
      where: { Legajo: req.params.legajo },
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ mensaje: error.message });
    } else {
      res.status(500).json({ mensaje: error.message });
    }
  }
});

// Crear ruta para eliminar un cliente
router.delete("/api/clientes/:legajo", async function (req, res, next) {
  try {
    let data = await db.clientes.destroy({
      where: { Legajo: req.params.legajo },
    });
   
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ mensaje: error.message });
    } else {
      res.status(500).json({ mensaje: error.message });
    }
  }
});

//-- SEGURIDAD ----------------------------------------------------------
router.get(
  "/api/jwt/clientes",
  auth.authenticateJWT,
  async function (req, res, next) {
    
    const { rol } = res.locals.user;
    if (rol !== "admin") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }

    let items = await db.clientes.findAll({
      attributes: ["Legajo", "Nombre", "FechaAlta"],
    });
    res.json(items);
  }
);

module.exports = router;
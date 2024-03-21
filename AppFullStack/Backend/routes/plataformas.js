const express = require("express");
const router = express.Router();
const auth = require("../seguridad/auth");
const { Op, ValidationError } = require("sequelize");

const db = require("../base-orm/sequelize-init");

// ----------------------------------------------------------------
router.get("/api/plataformas", async function (req, res, next) {
    let where = {};
    if (req.query.Nombre != undefined && req.query.Nombre !== "") {
      where.Nombre = {
        [Op.like]: "%" + req.query.Nombre + "%",
      };
    }
  
    // Paginación
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;
    const { count, rows } = await db.plataformas.findAndCountAll({
      attributes: [
        "IdPlataforma",
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

// Crear ruta para obtener todos los plataformas
router.get("/api/plataformas", async function (req, res, next) {
    let data = await db.plataformas.findAll({
        attributes: ["IdPlataforma", "Nombre", "FechaAlta"],
    });
    res.json(data);
    }
);

// Crear ruta para obtener un plataforma por su IdPlataforma
router.get("/api/plataformas/:id", async function (req, res, next) {
    let data = await db.plataformas.findAll({
        attributes: ["IdPlataforma", "Nombre", "FechaAlta"],
        where: { IdPlataforma: req.params.id },
    });
    if (data.length > 0 ) res.json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
    }
);

// Crear CRUD = ABM con validacion de errores

// Crear ruta para crear una plataforma
router.post("/api/plataformas", async function (req, res, next) {
    try {
        let data = await db.plataformas.create({
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

// Crear ruta para modificar una plataforma
router.put("/api/plataformas/:id", async function (req, res, next) {
    try {
        let data = await db.plataformas.update(req.body, {
            where: { IdPlataforma: req.params.id },
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

// Crear ruta para eliminar una plataforma
router.delete("/api/plataformas/:id", async function (req, res, next) {
    try {
        let data = await db.plataformas.destroy({
            where: { IdPlataforma: req.params.id },
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
    "/api/jwt/plataformas",
    auth.authenticateJWT,
    async function (req, res, next) {
      const { rol } = res.locals.user;
      if (rol !== "admin") {
        return res.status(403).json({ message: "usuario no autorizado!" });
      }
  
      let items = await db.plataformas.findAll({
        attributes: ["IdPlataforma", "Nombre", "FechaAlta"],
        });
      res.json(items);
    }
  );

module.exports = router;
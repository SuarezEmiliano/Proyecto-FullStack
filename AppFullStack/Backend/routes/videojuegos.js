const express = require("express");
const router = express.Router();
const auth = require("../seguridad/auth");
const { Op, ValidationError } = require("sequelize");

const db = require("../base-orm/sequelize-init");

// ----------------------------------------------------------------
router.get("/api/videojuegos", async function (req, res, next) {
    let where = {};
    if (req.query.Nombre != undefined && req.query.Nombre !== "") {
      where.Nombre = {
        [Op.like]: "%" + req.query.Nombre + "%",
      };
    }
  
    // Paginación
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;
    const { count, rows } = await db.videojuegos.findAndCountAll({
      attributes: [
        "IdVideojuego",
        "Nombre",
        "Precio",
        "FechaSalida",
        "IdCategoria",
      ],
      order: [["Nombre", "ASC"]],
      where,
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });
    
    return res.json({ Items: rows, RegistrosTotal: count });
});
// ----------------------------------------------------------------

// Crear ruta para obtener un videojuego por su IdVideojuego
router.get("/api/videojuegos/:id", async function (req, res, next) {
        let data = await db.videojuegos.findAll({
            attributes: ["IdVideojuego", "Nombre", "Precio", "FechaSalida", "IdCategoria"],
            where: { IdVideojuego: req.params.id },
        });
        if (data.length > 0 ) res.json(data[0]);
        else res.status(404).json({mensaje:'No econtrado!!'})
    }
);

// Crear CRUD = ABM con validacion de errores

// Crear ruta para crear un videojuego
router.post("/api/videojuegos", async function (req, res, next) {
    try {
        let data = await db.videojuegos.create({
            Nombre: req.body.Nombre,
            Precio: req.body.Precio,
            FechaSalida: req.body.FechaSalida,
            IdCategoria: req.body.IdCategoria,
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

// Crear ruta para modificar un videojuego
router.put("/api/videojuegos/:id", async function (req, res, next) {
    try {
        let data = await db.videojuegos.update(req.body, {
            where: { IdVideojuego: req.params.id },
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

// Crear ruta para eliminar un videojuego
router.delete("/api/videojuegos/:id", async function (req, res, next) {
    try {
        let data = await db.videojuegos.destroy({
            where: { IdVideojuego: req.params.id },
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
    "/api/jwt/videojuegos",
    auth.authenticateJWT,
    async function (req, res, next) {
    
    const { rol } = res.locals.user;
    if (rol !== "admin") {
        return res.status(403).json({ message: "usuario no autorizado!" });
    }

    let items = await db.videojuegos.findAll({
        attributes: ["IdVideojuego", "Nombre", "Precio", "FechaSalida", "IdCategoria"],
        });
    res.json(items);
    }
);

module.exports = router;
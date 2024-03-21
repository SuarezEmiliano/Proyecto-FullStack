const express = require("express");
const router = express.Router();
const auth = require("../seguridad/auth");
const { Op, ValidationError } = require("sequelize");

const db = require("../base-orm/sequelize-init");

// ----------------------------------------------------------------
router.get("/api/empleados", async function (req, res, next) {
    let where = {};
    if (req.query.Nombre != undefined && req.query.Nombre !== "") {
      where.Nombre = {
        [Op.like]: "%" + req.query.Nombre + "%",
      };
    }
  
    // Paginación
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;
    const { count, rows } = await db.empleados.findAndCountAll({
      attributes: [
        "IdEmpleado",
        "Nombre",
        "FechaNacimiento",
      ],
      order: [["Nombre", "ASC"]],
      where,
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });
    
    return res.json({ Items: rows, RegistrosTotal: count });
});
// ----------------------------------------------------------------

// Crear ruta para obtener todos los empleados
router.get("/api/empleados", async function (req, res, next) {
    let data = await db.empleados.findAll({
        attributes: ["IdEmpleado", "Nombre", "FechaNacimiento"],
    });
    res.json(data);
    }
);

// Crear ruta para obtener un empleado por su IdEmpleado
router.get("/api/empleados/:id", async function (req, res, next) {
    let data = await db.empleados.findAll({
        attributes: ["IdEmpleado", "Nombre", "FechaNacimiento"],
        where: { IdEmpleado: req.params.id },
    });
    if (data.length > 0 ) res.json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
    }
);

// Crear CRUD = ABM con validacion de errores

// Crear ruta para crear un empleado
router.post("/api/empleados", async function (req, res, next) {
    try {
        let data = await db.empleados.create({
            Nombre: req.body.Nombre,
            FechaNacimiento: req.body.FechaNacimiento,
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

// Crear ruta para modificar un empleado
router.put("/api/empleados/:id", async function (req, res, next) {
    try {
        let data = await db.empleados.update(req.body, {
            where: { IdEmpleado: req.params.id },
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

// Crear ruta para eliminar un empleado
router.delete("/api/empleados/:id", async function (req, res, next) {
    try {
        let data = await db.empleados.destroy({
            where: { IdEmpleado: req.params.id },
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
    "/api/jwt/empleados",
    auth.authenticateJWT,
    async function (req, res, next) {
      
      const { rol } = res.locals.user;
      if (rol !== "admin") {
        return res.status(403).json({ message: "usuario no autorizado!" });
      }
  
      let items = await db.empleados.findAll({
        attributes: ["IdEmpleado", "Nombre", "FechaNacimiento"],
        });
      res.json(items);
    }
  );

module.exports = router;
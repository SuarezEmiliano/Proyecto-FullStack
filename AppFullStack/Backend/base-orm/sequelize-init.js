// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/videojuegos.db");

// definicion del modelo de datos
// cliente -------------------------------------------------------------------------
const clientes = sequelize.define(
    "clientes",
    {
      Legajo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Nombre: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Nombre es requerido",
          },
          len: {
            args: [5, 30],
            msg: "Nombre debe ser tipo carateres, entre 5 y 30 de longitud",
          },
        },
      },
      FechaAlta: {
          type: DataTypes.STRING(30),
          allowNull: false,
          validate: {
              notEmpty: {
                  args: true,
                  msg: "Fecha de Alta es requerida",
              },
              len: {
                  args: [5, 30],
                  msg: "Fecha debe ser tipo carateres, entre 5 y 30 de longitud",
                },
          },
      },
    },
    // Objeto de OPCIONES
    {
      // pasar a mayusculas
      hooks: {
        beforeValidate: function (clientes, options) {
          if (typeof clientes.Nombre === "string") {
            clientes.Nombre = clientes.Nombre.toUpperCase().trim();
          }
        },
      },
  
      timestamps: false,
    }
  );
// empleados -------------------------------------------------------------------------
const empleados = sequelize.define(
  "empleados",
  {
    IdEmpleado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo carateres, entre 5 y 30 de longitud",
        },
      },
      unique: {
        args: true,
        msg: "este Nombre ya existe en la tabla!",
      },
    },
    FechaNacimiento: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Fecha de Nacimiento es requerida",
            },
            len: {
                args: [5, 30],
                msg: "Fecha debe ser tipo carateres, entre 5 y 30 de longitud",
            },
        },
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (empleados, options) {
        if (typeof empleados.Nombre === "string") {
          empleados.Nombre = empleados.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

// videojuegos -------------------------------------------------------------------------
const videojuegos = sequelize.define(
  "videojuegos",
{
  IdVideojuego: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
          notEmpty: {
              args: true,
              msg: "Nombre es requerido",
          },
          len: {
              args: [5, 30],
              msg: "Nombre debe ser tipo carateres, entre 5 y 30 de longitud",
          },
      },
      unique: {
          args: true,
          msg: "este Nombre ya existe en la tabla!",
      },
  },
  Precio: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
          notEmpty: {
              args: true,
              msg: "Precio es requerido",
          },
      },
  },
  FechaSalida: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
          notEmpty: {
              args: true,
              msg: "Fecha de Salida es requerida",
          },
          len: {
              args: [5, 30],
              msg: "Nombre debe ser tipo carateres, entre 5 y 30 de longitud",
          },
      },
  },
  IdCategoria: {
      type: DataTypes.NUMBER,
      foreignKey: true,
      allowNull: false,
      validate: {
          notEmpty: {
              args: true,
              msg: "IdCategoria es requerido",
          },
      },
  },
},
{
  // pasar a mayusculas
  hooks: {
      beforeValidate: function (videojuegos, options) {
          if (typeof videojuegos.Nombre === "string") {
              videojuegos.Nombre = videojuegos.Nombre.toUpperCase().trim();
          }
      },
  },

  timestamps: false,
}
);

// categorias -------------------------------------------------------------------------
const categorias = sequelize.define(
  "categorias",
  {
    IdCategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nombre: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Nombre es requerido",
            },
            len: {
                args: [5, 30],
                msg: "Nombre debe ser tipo carateres, entre 5 y 30 de longitud",
            },
        },
        unique: {
            args: true,
            msg: "este Nombre ya existe en la tabla!",
        },
    },
    FechaAlta: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Fecha de Alta es requerida",
            },
            len: {
                args: [5, 30],
                msg: "Fecha debe ser tipo carateres, entre 5 y 30 de longitud",
            },
        },
    },
  },
  {
    // pasar a mayusculas
    hooks: {
        beforeValidate: function (categorias, options) {
            if (typeof categorias.Nombre === "string") {
                categorias.Nombre = categorias.Nombre.toUpperCase().trim();
            }
        },
    },

    timestamps: false,
  }
);

// plataformas -------------------------------------------------------------------------
const plataformas = sequelize.define(
    "plataformas",
{
    IdPlataforma: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nombre: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Nombre es requerido",
            },
            len: {
                args: [5, 30],
                msg: "Nombre debe ser tipo carateres, entre 5 y 30 de longitud",
            },
        },
        unique: {
            args: true,
            msg: "este Nombre ya existe en la tabla!",
        },
    },
    FechaAlta: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Fecha de Alta es requerida",
            },
            len: {
                args: [5, 30],
                msg: "Fecha debe ser tipo carateres, entre 5 y 30 de longitud",
            },
        },
    },
},
{
    // pasar a mayusculas
    hooks: {
        beforeValidate: function (categorias, options) {
            if (typeof categorias.Nombre === "string") {
                categorias.Nombre = categorias.Nombre.toUpperCase().trim();
            }
        },
    },

    timestamps: false,
}
);

// Establecer la relación entre los modelos Videojuegos y IdCategoria
videojuegos.hasMany(categorias, { foreignKey: "IdCategoria" });
categorias.belongsTo(videojuegos, { foreignKey: "IdCategoria" });

module.exports = {
    sequelize,
    clientes,
    empleados,
    videojuegos,
    categorias,
    plataformas
};
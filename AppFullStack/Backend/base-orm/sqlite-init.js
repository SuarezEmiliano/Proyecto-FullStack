const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/videojuegos.db");

  /* TABLA CLIENTES */
  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'clientes'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table clientes( 
            Legajo INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre string NOT NULL UNIQUE
            , FechaAlta string NOT NULL
            );`
    );
    console.log("tabla clientes creada!");
    await db.run(
      `insert into clientes (Nombre, FechaAlta) values
        ('Ana Rodríguez', '2000-05-01'),
        ('Juan Pérez', '1998-01-01'),
        ('María Gómez', '1996-01-11'),
        ('Carlos Sánchez', '1998-04-30'),
        ('Laura Torres', '2001-12-28'),
        ('Pedro López', '1999-01-01'),
        ('Patricia Martínez', '2003-01-18'),
        ('Andrés Ramírez', '1985-03-05'),
        ('Gabriela Herrera', '1990-12-18'),
        ('Alejandro Fernández', '1986-10-01')
        ;`
    );
  }
  
  /* TABLA EMPLEADOS */
  existe = false;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'empleados'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table empleados( 
            IdEmpleado INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre string NOT NULL UNIQUE
            , FechaNacimiento string NOT NULL
            );`
    );
    console.log("tabla empleados creada!");
    await db.run(
      `insert into empleados (Nombre, FechaNacimiento) values
        ('Pipo Rodríguez', '1989-01-01'),
        ('Leopardo Pérez', '1990-01-31'),
        ('Mirta Gómez', '1979-01-12'),
        ('Chiche Sánchez', '1977-01-30'),
        ('Alfredo Torres', '2000-12-28'),
        ('Azul López', '1994-01-01'),
        ('Hugo Martínez', '1997-01-18'),
        ('Marta Ramírez', '1980-02-03'),
        ('Belen Herrera', '1994-12-25'),
        ('Maru Botana', '1989-01-01')
        ;`
    );
  }

  /* TABLA VIDEOJUEGOS */
  existe = false;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'videojuegos'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table videojuegos( 
              IdVideojuego INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre string NOT NULL UNIQUE
            , Precio number NOT NULL
            , FechaSalida string NOT NULL
            , IdCategoria number NOT NULL
            , FOREIGN KEY (IdCategoria) REFERENCES categorias(IdCategoria)
            );`
    );
    console.log("tabla videojuegos creada!");

    await db.run(
      `insert into videojuegos (Nombre, Precio, FechaSalida, IdCategoria) values 
        ('FORTNIGT', 2600, '2018-11-09', 6),
        ('TETRIS EFFECT: CONNECTED', 2600, '2018-11-09', 8),
        ('GOD OF WAR: RAGNAROK', 8499, '2022-11-10', 2),
        ('STARDEW VALLEY', 179, '2016-02-26', 5),
        ('DIVINITY: ORIGINAL SIN 2', 7499, '2017-09-14', 4),
        ('FIFA 23', 8999, '2022-09-27', 3),
        ('GRAN TURISMO 7', 13500, '2022-03-04', 6),
        ('PERSONA 5 ROYAL', 7999, '2019-10-31', 7),
        ('ELDER RING', 8599, '2022-02-25', 1),
        ('ARK: SURVIVAL EVOLVED', 224, '2015-06-02', 10),
        ('RESIDENT EVIL VILLAGE', 3400, '2021-05-07', 9)
        ;`
    );
    
  }

  /* TABLA CATEGORIAS */
  existe = false;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'categorias'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table categorias( 
            IdCategoria INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre string NOT NULL UNIQUE
            , FechaAlta string NOT NULL
            );`
    );
    console.log("tabla categorias creada!");
    await db.run(
      `insert into categorias values
        (1,'ACCION', '2020-01-01'),
        (2,'AVENTURA', '2017-01-31'),
        (3,'DEPORTIVO', '2017-01-12'),
        (4,'ESTRATEGIA', '2017-01-30'),
        (5,'SIMULACION', '2018-12-28'),
        (6,'CARRERAS', '2017-01-01'),
        (7,'ROL', '2019-01-18'),
        (8,'PUZZLE', '2017-02-03'),
        (9,'TERROR', '2016-12-25'),
        (10,'SUPERVIVENCIA', '2022-01-01')
        ;`
    );
  }

  /* TABLA PLATAFORMAS */
  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'plataformas'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table plataformas( 
            IdPlataforma INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre string NOT NULL UNIQUE
            , FechaAlta string NOT NULL
            );`
    );
    console.log("tabla plataformas creada!");
    await db.run(
      `insert into plataformas values
        (1,'Xbox Series X', '2020-11-10'),
        (2,'Xbox Series S', '2020-10-10'),
        (3,'Play Station 3', '2006-11-11'),
        (4,'Play Station 4', '2013-11-15'),
        (5,'Play Station 5', '2020-11-12'),
        (6,'WII U', '2012-09-18'),
        (7,'XBOX ONE', '2013-01-22'),
        (8,'PC', '2010-02-03'),
        (9,'Nintendo Switch', '2017-03-03'),
        (10,'Steam Deck', '2022-02-25')
        ;`
    );
  }

  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;
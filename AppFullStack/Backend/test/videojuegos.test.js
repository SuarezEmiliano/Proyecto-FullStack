const request = require("supertest");
const app = require("../index");

const videojuegoAlta = {
    IdVideojuego: 11,
    Nombre: "Videojuego de prueba",
    Precio: 1000,
    FechaSalida: "01-01-2021",
    IdCategoria: 1,
};

const videojuegoModificacion = {
    IdVideojuego: 5,
    Nombre: "FFIFA2021",
    Precio: 2000,
    FechaSalida: "01-01-2021",
    IdCategoria: 3,  // Se debe poner la misma categoria que la que tiene el videojuego a modificar
};

const videojuegoBaja = {
    IdVideojuego: 3,
    Nombre: "STARDEW VALLEY",
    Precio: 179,
    FechaSalida: "2016-02-26",
    IdCategoria: 5,
};

describe("GET /api/videojuegos", function () {
    it("Devolveria todos los videojuegos", async function () {
        const res = await request(app).get("/api/videojuegos");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                        IdVideojuego: expect.any(Number),
                        Nombre: expect.any(String),
                        Precio: expect.any(Number),
                        FechaSalida: expect.any(String),
                        IdCategoria: expect.any(Number),
                    })
            ])
        );
    });
}
);

describe("GET /api/videojuegos/:id", function () {
    it("Devolveria un videojuego", async function () {
        const res = await request(app).get("/api/videojuegos/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdVideojuego: expect.any(Number),
                Nombre: expect.any(String),
                Precio: expect.any(Number),
                FechaSalida: expect.any(String),
                IdCategoria: expect.any(Number),
            })
        );
    });
}
);

describe("POST /api/videojuegos", function () {
    it("Crearia un videojuego", async function () {
        const res = await request(app).post("/api/videojuegos").send(videojuegoAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdVideojuego: expect.any(Number),
                Nombre: expect.any(String),
                Precio: expect.any(Number),
                FechaSalida: expect.any(String),
                IdCategoria: expect.any(Number),
            })
        );
    });
}
);

describe("PUT /api/videojuegos/:id", function () {
    it("Modificaria un videojuego", async function () {
        const res = await request(app).put("/api/videojuegos/5").send(videojuegoModificacion);
        expect(res.statusCode).toEqual(200);
    });
}
);

describe("DELETE /api/videojuegos/:id", function () {
    it("Daria de baja un videojuego", async function () {
        const res = await request(app).delete("/api/videojuegos/3").send(videojuegoBaja);
        expect(res.statusCode).toEqual(200);
    });
}
);
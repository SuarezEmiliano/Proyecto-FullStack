const request = require("supertest");
const app = require("../index");

const plataformaAlta = {
    IdPlataforma: 12,
    Nombre: "Plataforma de prueba",
    FechaAlta: "10-10-2020"
};

const plataformaModificada = {
    IdPlataforma: 2,
    Nombre: "Nueva plataforma de prueba",
    FechaAlta: "2017-01-31"
};

const plataformaBaja = {
    IdPlataforma: 4,
    Nombre: "Play Station 4",
    FechaAlta: "2013-11-15"
};

describe("GET /api/plataformas", function () {
    it("Devolveria todas las plataformas", async function () {
        const res = await request(app)
            .get("/api/plataformas");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    IdPlataforma: expect.any(Number),
                    Nombre: expect.any(String),
                    FechaAlta: expect.any(String),
                })
            ])
        );
    });
}
);

describe("GET /api/plataformas/:id", function () {
    it("Devolveria una plataforma", async function () {
        const res = await request(app)
            .get("/api/plataformas/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdPlataforma: expect.any(Number),
                Nombre: expect.any(String),
                FechaAlta: expect.any(String),
            })
        );
    });
}
);

describe("POST /api/plataformas", function () {
    it("Crearia una plataforma", async function () {
        const res = await request(app)
            .post("/api/plataformas")
            .send(plataformaAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdPlataforma: expect.any(Number),
                Nombre: expect.any(String),
                FechaAlta: expect.any(String),
            })
        );
    });
}
);

describe("PUT /api/plataformas/:id", function () {
    it("Modificaria una plataforma", async function () {
        const res = await request(app).put("/api/plataformas/2").send(plataformaModificada);
        expect(res.statusCode).toEqual(200);
    });
}
);

describe("DELETE /api/plataformas/:id", function () {
    it("Daria de baja una plataforma", async function () {
        const res = await request(app).delete("/api/plataformas/:4").send(plataformaBaja);
        expect(res.statusCode).toEqual(200);
    });
}
);
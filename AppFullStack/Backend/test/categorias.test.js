const request = require("supertest");
const app = require("../index");

const categoriaAlta = {
    IdCategoria: 11,
    Nombre: "Categoria de prueba",
    FechaAlta: "10-10-2020"
};

const categoriaModificada = {
    IdCategoria: 2,
    Nombre: "Nueva categoria de prueba",
    FechaAlta: "01-01-2022"
};

const categoriaBaja = {
    IdCategoria: 9,
    Nombre: "TERROR",
    FechaAlta: "2016-12-25"
};

describe("GET /api/categorias", function () {
    it("Devolveria todas las categorias", async function () {
        const res = await request(app)
            .get("/api/categorias");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    IdCategoria: expect.any(Number),
                    Nombre: expect.any(String),
                    FechaAlta: expect.any(String),
                })
            ])
        );
    });
}
);

describe("GET /api/categorias/:id", function () {
    it("Devolveria una categoria", async function () {
        const res = await request(app)
            .get("/api/categorias/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdCategoria: expect.any(Number),
                Nombre: expect.any(String),
                FechaAlta: expect.any(String),
            })
        );
    });
}
);

describe("POST /api/categorias", function () {
    it("Crearia una categoria", async function () {
        const res = await request(app)
            .post("/api/categorias")
            .send(categoriaAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdCategoria: expect.any(Number),
                Nombre: expect.any(String),
                FechaAlta: expect.any(String),
            })
        );
    });
}
);

describe("PUT /api/categorias/:id", function () {
    it("Modificaria una categoria", async function () {
        const res = await request(app).put("/api/categorias/2").send(categoriaModificada);
        expect(res.statusCode).toEqual(200);
    });
}
);

describe("DELETE /api/categorias/:id", function () {
    it("Daria de baja una categoria", async function () {
        const res = await request(app).delete("/api/categorias/:9").send(categoriaBaja);
        expect(res.statusCode).toEqual(200);
    });
}
);
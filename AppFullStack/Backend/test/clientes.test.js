const request = require("supertest");
const app = require("../index");

const clienteAlta = {
    DocCliente: 45335878,
    Nombre: "Cliente de prueba",
    FechaAlta: "2004-01-31"
};

const clienteModificado = {
    DocCliente: 37654321,
    Nombre: "Nuevo Nombre Cliente de prueba",
    FechaAlta: "1998-01-01"
};

const clienteBaja = {
    DocCliente: 43567890,
    Nombre: "Laura Torres",
    FechaAlta: "2001-12-28"
};

describe("GET /api/clientes", function () {
    it("Devolveria todos los clientes", async function () {
        const res = await request(app)
            .get("/api/clientes");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    DocCliente: expect.any(Number),
                    Nombre: expect.any(String),
                    FechaAlta: expect.any(String),
                })
            ])
        );
    });
}
);

describe("GET /api/clientes/:doc", function () {
    it("Devolveria un cliente", async function () {
        const res = await request(app).get("/api/clientes/42345678");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                DocCliente: expect.any(Number),
                Nombre: expect.any(String),
                FechaAlta: expect.any(String),
            })
        );
    });
}
);

describe("POST /api/clientes", function () {
    it("Agregaria un cliente", async function () {
        const res = await request(app).post("/api/clientes").send(clienteAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                DocCliente: expect.any(Number),
                Nombre: expect.any(String),
                FechaAlta: expect.any(String),
            })
        );
    });
}
);

describe("PUT /api/clientes/:doc", function () {
    it("Modificaria un cliente", async function () {
        const res = await request(app).put("/api/clientes/37654321").send(clienteModificado);
        expect(res.statusCode).toEqual(200);
    });
}
);

describe("DELETE /api/clientes/:doc", function () {
    it("Daria de baja un cliente", async function () {
        const res = await request(app).delete("/api/clientes/43567890").send(clienteBaja);
        expect(res.statusCode).toEqual(200);
    });
}
);
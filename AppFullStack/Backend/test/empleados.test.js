const request = require("supertest");
const app = require("../index");

const empleadoAlta = {
    IdEmpleado: 11,
    Nombre: "Empleado de prueba",
    FechaNacimiento: "2001-03-07",
};

const empleadoModificacion = {
    IdEmpleado: 2,
    Nombre: "Nuevo empleado de prueba",
    FechaNacimiento: "1990-01-31",
};

const empleadoBaja = {
    IdEmpleado: 1,
    Nombre: "Pipo Rodríguez",
    FechaNacimiento: "1989-01-01",
};

describe("GET /api/empleados", function () {
    it("Devolveria todos los empleados", async function () {
        const res = await request(app)
            .get("/api/empleados");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    IdEmpleado: expect.any(Number),
                    Nombre: expect.any(String),
                    FechaNacimiento: expect.any(String),
                })
            ])
        );
    });
}
);

describe("GET /api/empleados/:id", function () {
    it("Devolveria un empleado", async function () {
        const res = await request(app)
            .get("/api/empleados/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdEmpleado: expect.any(Number),
                Nombre: expect.any(String),
                FechaNacimiento: expect.any(String),
            })
        );
    });
}
);

describe("POST /api/empleados", function () {
    it("Crearia un empleado", async function () {
        const res = await request(app)
            .post("/api/empleados")
            .send(empleadoAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdEmpleado: expect.any(Number),
                Nombre: expect.any(String),
                FechaNacimiento: expect.any(String),
            })
        );
    });
}
);

describe("PUT /api/empleados/:id", function () {
    it("Modificaria un empleado", async function () {
        const res = await request(app).put("/api/empleados/2").send(empleadoModificacion);
        expect(res.statusCode).toEqual(200);
    });
}
);

describe("DELETE /api/empleados/:id", function () {
    it("Eliminaria un empleado", async function () {
        const res = await request(app).delete("/api/empleados/1").send(empleadoBaja);
        expect(res.statusCode).toEqual(200);
    });
}
);

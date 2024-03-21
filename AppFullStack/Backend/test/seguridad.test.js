//  En package.json -> "test": "jest --testTimeout=10000"
const request = require("supertest");
const app = require("../index");

const usuarioAdmin = { usuario: "admin", clave: "123", rol: "admin" };
const usuarioMiembro = { usuario: "juan", clave: "123", rol: "member" };

describe("POST /api/login", function () {
    it("Devolveria error de autenticacion, porque tiene clave erronea", async function () {
        const res = await request(app)
            .post("/api/login")
            .send({ usuario: "admin", clave: "erronea" });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("Usuario o clave incorrecto");
    });

    it("Devolveria el token para usuario admin", async function () {
        const res = await request(app)
            .post("/api/login")
            .send(usuarioAdmin);
        expect(res.statusCode).toEqual(200);
        expect(res.body.accessToken).toEqual(expect.any(String));
    });
});

describe("GET /api/jwt/videojuegos", function () {
    it("Devolveria error, porque falta token de autorizacion", async function () {
        const res = await request(app).get("/api/jwt/videojuegos");
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual("Acceso denegado");
    });

    it("Devolveria error, porque el token es invalido", async function () {
        const res = await request(app)
            .get("/api/jwt/videojuegos")
            .set("Authorization", "Bearer token_invalido");
        expect(res.statusCode).toEqual(403);
        expect(res.body.message).toEqual("token no es valido");
    });

    it("Devolveria todos los videojuegos, solo autorizado para administradores", async function () {
        const res1 = await request(app)
            .post("/api/login")
            .set("Content-Type", "application/json")
            .send(usuarioAdmin);
            expect(res1.statusCode).toEqual(200);
            let token = res1.body.accessToken;

        const res2 = await request(app)
            .get("/api/jwt/videojuegos")
            .set("Authorization", "Bearer " + token);

        expect(res2.statusCode).toEqual(200);
        expect(res2.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    IdVideojuego: expect.any(Number),
                    Nombre: expect.any(String),
                    Precio: expect.any(Number),
                    FechaSalida: expect.any(String),
                    IdCategoria: expect.any(Number),
                }),
            ])
        );
    });

    it("Devolveria error de autorizacion, porque solo estan autorizados los administradores", async function () {
        const res1 = await request(app)
            .post("/api/login")
            .set("Content-Type", "application/json")
            .send(usuarioMiembro);
            expect(res1.statusCode).toEqual(200);
            let token = res1.body.accessToken;

        const res2 = await request(app)
            .get("/api/jwt/videojuegos")
            .set("Authorization", "Bearer " + token);

        expect(res2.statusCode).toEqual(403);
        expect(res2.body.message).toEqual("usuario no autorizado!");
    });
});

describe("GET /api/jwt/plataformas", function () {
    it("Devolveria error, porque falta token de autorizacion", async function () {
        const res = await request(app).get("/api/jwt/plataformas");
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual("Acceso denegado");
    });

    it("Devolveria error, porque el token es invalido", async function () {
        const res = await request(app)
            .get("/api/jwt/plataformas")
            .set("Authorization", "Bearer token_invalido");
        expect(res.statusCode).toEqual(403);
        expect(res.body.message).toEqual("token no es valido");
    });

    it("Devolveria todos los plataformas, solo autorizado para administradores", async function () {
        const res1 = await request(app)
            .post("/api/login")
            .set("Content-Type", "application/json")
            .send(usuarioAdmin);
            expect(res1.statusCode).toEqual(200);
            let token = res1.body.accessToken;

        const res2 = await request(app)
            .get("/api/jwt/plataformas")
            .set("Authorization", "Bearer " + token);

        expect(res2.statusCode).toEqual(200);
        expect(res2.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    IdPlataforma: expect.any(Number),
                    Nombre: expect.any(String),
                    FechaAlta: expect.any(String),
                }),
            ])
        );
    });

    it("Devolveria error de autorizacion, porque solo estan autorizados los administradores", async function () {
        const res1 = await request(app)
            .post("/api/login")
            .set("Content-Type", "application/json")
            .send(usuarioMiembro);
            expect(res1.statusCode).toEqual(200);
            let token = res1.body.accessToken;

        const res2 = await request(app)
            .get("/api/jwt/plataformas")
            .set("Authorization", "Bearer " + token);

        expect(res2.statusCode).toEqual(403);
        expect(res2.body.message).toEqual("usuario no autorizado!");
    });
});

describe("GET /api/jwt/empleados", function () {
    it("Devolveria error, porque falta token de autorizacion", async function () {
        const res = await request(app).get("/api/jwt/empleados");
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual("Acceso denegado");
    });

    it("Devolveria error, porque el token es invalido", async function () {
        const res = await request(app)
            .get("/api/jwt/empleados")
            .set("Authorization", "Bearer token_invalido");
        expect(res.statusCode).toEqual(403);
        expect(res.body.message).toEqual("token no es valido");
    });

    it("Devolveria todos los empleados, solo autorizado para administradores", async function () {
        const res1 = await request(app)
            .post("/api/login")
            .set("Content-Type", "application/json")
            .send(usuarioAdmin);
            expect(res1.statusCode).toEqual(200);
            let token = res1.body.accessToken;

        const res2 = await request(app)
            .get("/api/jwt/empleados")
            .set("Authorization", "Bearer " + token);

        expect(res2.statusCode).toEqual(200);
        expect(res2.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    IdEmpleado: expect.any(Number),
                    Nombre: expect.any(String),
                    FechaNacimiento: expect.any(String),
                }),
            ])
        );
    });

    it("Devolveria error de autorizacion, porque solo estan autorizados los administradores", async function () {
        const res1 = await request(app)
            .post("/api/login")
            .set("Content-Type", "application/json")
            .send(usuarioMiembro);
            expect(res1.statusCode).toEqual(200);
            let token = res1.body.accessToken;

        const res2 = await request(app)
            .get("/api/jwt/empleados")
            .set("Authorization", "Bearer " + token);

        expect(res2.statusCode).toEqual(403);
        expect(res2.body.message).toEqual("usuario no autorizado!");
    });
});

describe("GET /api/jwt/clientes", function () {
    it("Devolveria error, porque falta token de autorizacion", async function () {
        const res = await request(app).get("/api/jwt/clientes");
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual("Acceso denegado");
    });

    it("Devolveria error, porque el token es invalido", async function () {
        const res = await request(app)
            .get("/api/jwt/clientes")
            .set("Authorization", "Bearer token_invalido");
        expect(res.statusCode).toEqual(403);
        expect(res.body.message).toEqual("token no es valido");
    });

    it("Devolveria todos los clientes, solo autorizado para administradores", async function () {
        const res1 = await request(app)
            .post("/api/login")
            .set("Content-Type", "application/json")
            .send(usuarioAdmin);
            expect(res1.statusCode).toEqual(200);
            let token = res1.body.accessToken;

        const res2 = await request(app)
            .get("/api/jwt/clientes")
            .set("Authorization", "Bearer " + token);

        expect(res2.statusCode).toEqual(200);
        expect(res2.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    DocCliente: expect.any(Number),
                    Nombre: expect.any(String),
                    FechaAlta: expect.any(String),
                }),
            ])
        );
    });

    it("Devolveria error de autorizacion, porque solo estan autorizados los administradores", async function () {
        const res1 = await request(app)
            .post("/api/login")
            .set("Content-Type", "application/json")
            .send(usuarioMiembro);
            expect(res1.statusCode).toEqual(200);
            let token = res1.body.accessToken;

        const res2 = await request(app)
            .get("/api/jwt/clientes")
            .set("Authorization", "Bearer " + token);

        expect(res2.statusCode).toEqual(403);
        expect(res2.body.message).toEqual("usuario no autorizado!");
    });
});
 
describe("GET /api/jwt/categorias", function () {
    it("Devolveria error, porque falta token de autorizacion", async function () {
        const res = await request(app).get("/api/jwt/categorias");
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual("Acceso denegado");
    });

    it("Devolveria error, porque el token es invalido", async function () {
        const res = await request(app)
            .get("/api/jwt/categorias")
            .set("Authorization", "Bearer token_invalido");
        expect(res.statusCode).toEqual(403);
        expect(res.body.message).toEqual("token no es valido");
    });

    it("Devolveria todos los categorias, solo autorizado para administradores", async function () {
        const res1 = await request(app)
            .post("/api/login")
            .set("Content-Type", "application/json")
            .send(usuarioAdmin);
            expect(res1.statusCode).toEqual(200);
            let token = res1.body.accessToken;

        const res2 = await request(app)
            .get("/api/jwt/categorias")
            .set("Authorization", "Bearer " + token);

        expect(res2.statusCode).toEqual(200);
        expect(res2.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    IdCategoria: expect.any(Number),
                    Nombre: expect.any(String),
                    FechaAlta: expect.any(String),
                }),
            ])
        );
    });

    it("Devolveria error de autorizacion, porque solo estan autorizados los administradores", async function () {
        const res1 = await request(app)
            .post("/api/login")
            .set("Content-Type", "application/json")
            .send(usuarioMiembro);
            expect(res1.statusCode).toEqual(200);
            let token = res1.body.accessToken;

        const res2 = await request(app)
            .get("/api/jwt/categorias")
            .set("Authorization", "Bearer " + token);

        expect(res2.statusCode).toEqual(403);
        expect(res2.body.message).toEqual("usuario no autorizado!");
    });
});
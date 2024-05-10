import { expect } from "chai";
import request from "supertest";
import { app } from "../app.js";

// Token de autenticación
let authToken;

describe("Products router", () => {
  // Iniciar sesión para obtener un token de autenticación
  before((done) => {
    request(app)
      .post("/api/session/login")
      .send({ email: "test@test.com", password: "test123" })
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        authToken = res.headers["set-cookie"][0]; // Obtener el token de la cookie
        done();
      });
  });

  describe("GET /", () => {
    it("Deberia devolver un conjunto de productos", (done) => {
      request(app)
        .get("/api/products")
        .set("Cookie", [authToken]) // Establecer el token de autenticación en la solicitud
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("GET /:pid", () => {
    it("Deberia devolver un producto especifico", (done) => {
      request(app)
        .get("/api/products/65a9b776ca2ffb8c669be621")
        .set("Cookie", [authToken])
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("POST /", () => {
    it("Deberia agregar un nuevo producto", (done) => {
      request(app)
        .post("/api/products")
        .set("Cookie", [authToken])
        .send({
          title: "Auto 5",
          description: "Automovil categoria 5",
          code: "aaammmmer5",
          price: 3400000,
          stock: 5,
          category: "Vehiculo",
        })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("PUT /:pid", () => {
    it("Deberia actualizar un producto especifico", (done) => {
      request(app)
        .put("/api/products/65a9b75cca2ffb8c669be61b")
        .set("Cookie", [authToken])
        .send({ title: "moto 2" })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("DELETE /:pid", () => {
    it("Deberia eliminar un producto especifico", (done) => {
      request(app)
        .delete("/api/products/65a8b13088f6efb942593df8")
        .set("Cookie", [authToken])
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });
});

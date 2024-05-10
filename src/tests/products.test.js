import { expect } from "chai";
import request from "supertest";
import { app } from "../app.js";

describe("Products router", () => {
  describe("GET /", () => {
    it("Deberia devolver un conjunto de productos", (done) => {
      request(app)
        .get("/api/products")
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
        .send({ title: "Auto 5",
        description: "Automovil categoria 5",
        code: "aaammmmer",
        price: 3400000,
        stock: 5,
        category: "Vehiculo" })
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
        .send({ title:  "moto 3"})
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
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });
});

import { expect } from "chai";
import request from "supertest";
import { app } from "../app.js";

let authToken;

describe("Carts router", () => {
  before((done) => {
    request(app)
      .post("/api/session/login")
      .send({ email: "testReg1@test.com", password: "test123" })
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        authToken = res.headers["set-cookie"][0]; // Obtener el token de la cookie
        done();
      });
  });

  describe("GET /", () => {
    it("Deberia devolver un arreglo de carritos", (done) => {
      request(app)
        .get("/api/carts")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });

  describe("POST /", () => {
    it("Deberia crear un nuevo carrito", (done) => {
      request(app)
        .post("/api/carts")
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).equal("Cart created");
          done();
        });
    });
  });

  describe("GET /:cid", () => {
    it("Deberia devolver un arreglos de los productos de cart", (done) => {
      request(app)
        .get("/api/carts/65f37d351310f75b411fddb8")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });

  describe("POST /:cid/product/:pid", () => {
    it("Deberia agregar un producto al carro", (done) => {
      request(app)
        .post(
          "/api/carts/661884cf3802b177124fee14/product/65a9b76cca2ffb8c669be61e"
        )
        .set("Cookie", [authToken])
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).equal("Product added");
          done();
        });
    });
  });

  describe("DELETE /:cid/product/:pid", () => {
    it("Deberia eliminar el producto del carro", (done) => {
      request(app)
        .delete(
          "/api/carts/661884cf3802b177124fee14/product/65a9b76cca2ffb8c669be61e"
        )
        .set("Cookie", [authToken])
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).equal("Product deleted");
          done();
        });
    });
  });

  describe("POST /:cid/product/:pid", () => {
    it("Deberia agregar un producto al carro", (done) => {
      request(app)
        .post(
          "/api/carts/661884cf3802b177124fee14/product/65a9b76cca2ffb8c669be61e"
        )
        .set("Cookie", [authToken])
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).equal("Product added");
          done();
        });
    });
  });

  describe("DELETE /:cid", () => {
    it("Deberia eliminar todos los productos del carro", (done) => {
      request(app)
        .delete(
          "/api/carts/661884cf3802b177124fee14"
        )
        .set("Cookie", [authToken])
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).equal("Products deleted from cart");
          done();
        });
    });
  });

  describe("POST /:cid/product/:pid", () => {
    it("Deberia agregar un producto al carro", (done) => {
      request(app)
        .post(
          "/api/carts/661884cf3802b177124fee14/product/65a9b76cca2ffb8c669be61e"
        )
        .set("Cookie", [authToken])
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).equal("Product added");
          done();
        });
    });
  });

  describe("PUT /:cid/product/:pid", () => {
    it("Deberia actualizar la cantidad del producto en carro", (done) => {
      request(app)
        .put(
          "/api/carts/661884cf3802b177124fee14/product/65a9b76cca2ffb8c669be61e"
        )
        .send({ quantity: 3 })
        .set("Cookie", [authToken])
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).equal("Product updated");
          done();
        });
    });
  });
  describe("PUT /:cid", () => {
    it("Deberia actualizar todos los productos del carro", (done) => {
      request(app)
        .put(
          "/api/carts/661884cf3802b177124fee14"
        )
        .send({ products: [{
          "product":"65a9b76cca2ffb8c669be61e"
        ,
        "quantity": 6,
      }] })
        .set("Cookie", [authToken])
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).equal("Products modified success");
          done();
        });
    });
  });
  describe("GET /:cid/purchase", () => {
    it("Deberia efectuar la compra de los productos en el carro", (done) => {
      request(app)
        .get(
          "/api/carts/661884cf3802b177124fee14/purchase"
        )
        .set("Cookie", [authToken])
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).equal("Successful purchase");
          done();
        });
    });
  });
  
});

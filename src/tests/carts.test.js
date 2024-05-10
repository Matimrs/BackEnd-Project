import { expect } from "chai";
import request from "supertest";
import { app } from "../app.js";

describe("Carts router", () => {
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
          expect(res.body.message).equal.to("Cart created");
          done();
        });
    });
  });


  describe("GET /:cid", () => {
    it("Deberia devolver un arreglos de los productos de cart", (done) => {
      request(app)
        .post("/api/carts/65f37d351310f75b411fddb8")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });

  



});

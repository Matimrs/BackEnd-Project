import { expect } from "chai";
import request from "supertest";
import { app } from "../app.js";

describe("Session router", () => {
  describe("POST /login", () => {
    it("Deberia iniciar sesion", (done) => {
      request(app)
        .post("/api/session/login")
        .send({ email: "test@test.com", password: "test123" })
        .expect(302) 
        .end((err, res) => {
          if (err) return done(err);
          expect(res.error).to.be.false;
          expect(res.header["location"]).to.equal("/"); 
          done();
        });
    }).timeout(5000);
  });
  describe("POST /register", () => {
    it("Deberia registrar el usuario", (done) => {
      request(app)
        .post("/api/session/register")
        .send({
            first_name: 'FNtest1',
            last_name: 'LNtest1',
            email: "testReg4@test.com", 
            age: 22,
            password: "test123" })
        .expect(302) 
        .end((err, res) => {
          if (err) return done(err);
          expect(res.error).to.be.false;
          expect(res.header["location"]).to.equal("/"); 
          done();
        });
    });
  });

  describe("POST /logout", () => {
    it("Debería cerrar sesión y redirigir a /login", (done) => {
      request(app)
        .post("/api/session/logout")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const cookies = res.headers["set-cookie"];
          expect(cookies).to.be.an("array");
          expect(cookies).to.have.lengthOf.at.least(1);
          cookies.forEach((cookie) => {
            expect(cookie).to.include("Expires=Thu, 01 Jan 1970 00:00:00 GMT");
          });
          expect(res.body.redirect).to.equal("http://localhost:8080/login");

          done();
        });
    });
  });
});

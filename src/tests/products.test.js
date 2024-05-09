import { expect } from "chai";
import request from "supertest";
import { app } from "../app.js";

describe("Products router", () => {
  describe("GET /", () => {
    it("", (done) => {
      request(app)
        .get("/api/products")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });
});

import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";
const expect = require("chai").expect;

chai.use(chaiHttp);
chai.should();

describe("Users", () => {
  describe("GET /", () => {
    it("should get all users", done => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
    it("should register user", done => {
      chai
        .request(app)
        .post("/register")
        .set("X-API-Key", "foobar")
        .send({ email: "dane@gmail.com", password: "dane123", name: "Dane" })
        .end((err, res) => {
          expect(200);
          expect(res.body).not.to.be.empty;
          expect(res).to.be.json;
          done();
        });
    });
  });
});

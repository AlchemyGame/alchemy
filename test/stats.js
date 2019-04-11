const chai = require("chai");
const chaiHttp = require("chai-http");
const supertest = require("supertest");

const server = require("../server");
const agent = supertest.agent(server);

chai.should();
chai.use(chaiHttp);

describe("Statistics tests", () => {
  before(done => {
    agent
    .post("/api/login")
    .type("form")
    .send({
      email: "admin@test.com",
      password: "1"
    })
    .end((error, res) => {
      done(error);
    });
  });

  it("Returns statistics", done => {
    agent
      .get("/api/stats")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should
          .be.an("object")
          .deep.equal({
            usersCount: 1,
            activeUsersCount: 1,
            bannedUsersCount: 1,
            // discoveredElementsCount: "discoveredElements"
            elementsCount: 5
          });
        done();
      });
  });
});

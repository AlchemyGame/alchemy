const supertest = require("supertest");
const server = require("../server");
const agent = supertest.agent(server);

describe("Anonymous user tests", () => {
  it("Return available elements", done => {
    agent
      .get("/api/elements/initial")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should
          .be.an("object")
          .have.property("response")
          .lengthOf(4);
        done();
      });
  });
  it("Return available recipes", done => {
    agent
      .get("/api/recipes/initial")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should
          .be.an("object")
          .have.property("response")
          .be.an("array")
          .have.lengthOf.at.least(1).and.lengthOf.at.most(10);
        done();
      });
  });
});

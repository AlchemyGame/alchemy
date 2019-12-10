const { User } = require("../models/user");

const supertest = require("supertest");
const server = require("../server");
const agent = supertest.agent(server);

describe("Anonymous user tests", () => {
  it("Reject to login with wrong credentials", done => {
    agent
      .post("/api/login")
      .send({
        email: "admin@test.com",
        password: "12345"
      })
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(403);
        res.body.should
          .be.an("object")
          .have.property("error")
          .equal("User has not been authorized");
        done();
      });
  });
  it("Reject to login with non-existing account", done => {
    agent
      .post("/api/login")
      .send({
        email: "not@registered.com",
        password: "12345"
      })
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(403);
        res.body.should
          .be.an("object")
          .have.property("error")
          .equal("User has not been authorized");
        done();
      });
  });
  it("Reject to login with disabled account", done => {
    // Change account password and make attempt to log in
    // as user can find out account status only with correct credentials
    User.findOne({ email: "new@test.com" }, (err, user) => {
      if (err) return done(err);
      user.password = "1";
      user.save(err => {
        if (err) console.error(err);
      });

      agent
        .post("/api/login")
        .send({
          email: "new@test.com",
          password: "1"
        })
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(404);
          res.body.should
            .be.an("object")
            .have.property("error")
            .equal("This user is disabled");
          done();
        });
    });
  });
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

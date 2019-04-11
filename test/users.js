const chai = require("chai");
const chaiHttp = require("chai-http");
const supertest = require("supertest");

const { User } = require("../models/user");

const server = require("../server");
const agent = supertest.agent(server);

chai.should();
chai.use(chaiHttp);

describe("Account tests", () => {
  before(done => {
    User.deleteMany({}, err => {
      if (err) done(err);
      const newUser = new User({
        email: "admin@test.com",
        username: "Admin",
        role: "Admin",
        password: "1"
      });
      newUser.save(error => {
        done(error);
      });
    });
  });

  it("Returns admin account data", done => {
    agent
      .post("/api/login")
      .type("form")
      .send({
        email: "admin@test.com",
        password: "1"
      })
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should
          .be.an("object")
          .have.property("user")
          .contain({
            role: "Admin",
            isDisabled: false,
            email: "admin@test.com",
            username: "Admin",
          });
        res.body.user.should.have.property("lastEntered");
        done();
      });
  });
  it("Returns admin account data, case insensitive input", done => {
    agent
      .post("/api/login")
      .type("form")
      .send({
        email: "aDmIn@TeSt.CoM",
        password: "1"
      })
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should
          .be.an("object")
          .have.property("user")
          .contain({
            role: "Admin",
            isDisabled: false,
            email: "admin@test.com",
            username: "Admin",
          });
        done();
      });
  });
  it("Returns admin account data, login with username", done => {
    agent
      .post("/api/login")
      .type("form")
      .send({
        email: "Admin",
        password: "1"
      })
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should
          .be.an("object")
          .have.property("user")
          .contain({
            role: "Admin",
            isDisabled: false,
            email: "admin@test.com",
            username: "Admin",
          });
        done();
      });
  });
  it("Returns current account data", done => {
    agent
      .get("/api/login")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should
          .be.an("object")
          .have.property("user")
          .contain({
            role: "Admin",
            isDisabled: false,
            email: "admin@test.com",
            username: "Admin",
          });
        res.body.user.should.have.property("created");
        res.body.user.should.have.property("lastEntered");
      done();
    });
  });
  it("Returns current account opened elements", done => {
    agent
      .get("/api/account/elements")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should
          .be.an("object")
          .have.property("elements")
          .lengthOf(4);
      done();
    });
  });
  it("Creates new account", done => {
    agent
      .post("/api/account/add")
      .type("form")
      .send({
        email: "new@test.com",
        username: "testAccount",
        role: "User"
      })
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should
          .be.an("object")
          .have.property("html")
          .match(/(?:You are registered in Alchemy)/);
        done();
    });
  });
  it("Doesn't register account with same email", done => {
    agent
      .post("/api/account/add")
      .type("form")
      .send({
        email: "NeW@TeSt.CoM",
        username: "testAccount",
        role: "User"
    })
    .end((err, res) => {
      if (err) return done(err);
      res.should.have.status(409);
      res.body.should
        .be.an("object")
        .have.property("error")
        .equal("Email already exists");
      done();
    });
  });
  it("Returns all accounts", done => {
    agent
      .get("/api/users")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should
          .be.an("object")
          .have.property("response")
          .be.an("array")
          .lengthOf(2);
        done();
      });
  });
  it("Returns only admins", done => {
    agent
      .get("/api/users")
      .query({ role: "admin"})
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should
          .be.an("object")
          .have.property("response")
          .be.an("array")
          .lengthOf(1);
        done();
      });
  });
  it("Returns only users", done => {
    agent
      .get("/api/users")
      .query({ role: "user"})
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should
          .be.an("object")
          .have.property("response")
          .be.an("array")
          .lengthOf(1);
        done();
      });
  });
  it("Disables new@test.com account and returns it's data", done => {
    User.findOne({ email: "new@test.com" }, (err, user) => {
      if (err) return done(err);
      agent
        .put("/api/account/disable")
        .send({
          accounts: [user._id]
        })
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          res.body.should
            .be.an("object")
            .have.property("response")
            .deep.equal({ n: 1, nModified: 1, ok: 1 });
          done();
        });
    });
  });
  it("Returns 0 users", done => {
    agent
      .get("/api/users")
      .query({ role: "user"})
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should
          .be.an("object")
          .have.property("response")
          .be.an("array")
          .lengthOf(0);
        done();
      });
  });
  it("Logouts from current account", done => {
    agent
      .get("/api/logout")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should
          .be.an("object")
          .have.property("response")
          .equal("Logged out");
        done();
      });
  });
  it("Fails to login with wrong credentials", done => {
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
  it("Fails to login with non-existing account", done => {
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
  it("Fails to login with disabled account", done => {
    // Change account password to login with correct credentials
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
  it("Tries to check session after logout", done => {
    agent
      .get("/api/login")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(401);
        res.body.should
          .be.an("object")
          .have.property("error")
          .equal("User session not found");
        done();
      });
  });
});

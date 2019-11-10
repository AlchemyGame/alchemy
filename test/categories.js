const chai = require("chai");
const chaiHttp = require("chai-http");
const supertest = require("supertest");

const { Category } = require("../models/category");

const server = require("../server");
const agent = supertest.agent(server);

chai.should();
chai.use(chaiHttp);

describe("Category tests", () => {
  before(done => {
    agent
      .post("/api/login")
      .type("form")
      .send({
        email: "admin@test.com",
        password: "1"
      })
      .end(error => {
        done(error);
      });
  });

  it("Check initial category", done => {
    agent
      .get("/api/categories")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should
          .be.an("object")
          .have.property("response")
          .lengthOf(1);
        res.body.response[0].should
          .be.an("object")
          .have.property("name").equal("Initial Elements");
        done();
      });
  });
  it("Add new category", done => {
    agent
      .post("/api/category/add")
      .send({ name: "Test Category" })
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(201);
        res.body.should
          .be.an("object")
          .have.property("response")
          .have.property("name").equal("Test Category");
        done();
      });
  });
  it("Reject category creation (already exists)", done => {
    agent
      .post("/api/category/add")
      .send({ name: "Test Category" })
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(409);
        res.body.should
          .be.an("object")
          .have.property("error").equal("Category with name 'Test Category' is already exists");
        done();
      });
  });
  it("Update existing category", async () => {
    const category = await Category.findOne({ name: "Test Category" }).lean();
    const res = await agent
      .put("/api/category/update")
      .send({
        name: "Updated category name",
        categoryId: category
      });
    res.should.have.status(200);
    res.body.should
      .be.an("object")
      .have.property("response")
      .have.property("name").equal("Updated category name");
  });
  it("Reject category update (missing parameters)", async () => {
    const res = await agent
      .put("/api/category/update")
      .send({
        name: "Updated category name"
      });
    res.should.have.status(400);
    res.body.should
      .be.an("object")
      .have.property("error").equal("Request must contain categoryId and name fields");
  });
  it("Delete category", async () => {
    const category = await Category.findOne({ name: "Updated category name" }).lean();
    const res = await agent
      .delete("/api/category/delete")
      .send({ categoryId: category });
    res.should.have.status(200);
    res.body.should
      .be.an("object")
      .have.property("response")
      .have.property("name").equal("Updated category name");
  });
  it("Add new category", done => {
    agent
      .post("/api/category/add")
      .send({ name: "Test Category" })
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(201);
        res.body.should
          .be.an("object")
          .have.property("response")
          .have.property("name").equal("Test Category");
        done();
      });
  });
});

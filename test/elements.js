const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiLike = require("chai-like");
const chaiThings = require("chai-things");
const supertest = require("supertest");

const { Category } = require("../models/category");
const { Element } = require("../models/element");

const server = require("../server");
const agent = supertest.agent(server);
const { generateId } = require("./helpers");

chai.should();
chai.use(chaiHttp);
chai.use(chaiLike);
chai.use(chaiThings);

describe("Element tests", () => {
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

  it("Get initial elements", done => {
    agent
      .get("/api/initialElements")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should
          .be.an("object")
          .have.property("response")
          .contain.something.like(
            {
              "name": "Air",
              "category": "Initial Elements"
            },
            {
              "name": "Earth",
              "category": "Initial Elements"
            },
            {
              "name": "Fire",
              "category": "Initial Elements"
            },
            {
              "name": "Water",
              "category": "Initial Elements"
            }
          );
        done();
      });
  });
  it("Add new element (for update and delete)", async () => {
    const category = await Category.findOne({ name: "Test Category" }).lean();
    const res = await agent
      .post("/api/element/add")
      .send({
        name: "Test Element",
        description: "Test",
        category
      });
    res.should.have.status(201);
    res.body.should
      .be.an("object")
      .have.property("response")
      .contain({
        name: "Test Element",
        description: "Test",
        category: category._id.toString()
      });
  });
  it("Add new element (to be opened by user)", async () => {
    const category = await Category.findOne({ name: "Test Category" }).lean();
    const res = await agent
      .post("/api/element/add")
      .send({
        name: "Non-Basic Element",
        description: "Test",
        category
      });
    res.should.have.status(201);
    res.body.should
      .be.an("object")
      .have.property("response")
      .contain({
        name: "Non-Basic Element",
        description: "Test",
        category: category._id.toString()
      });
  });
  it("Add new element (undiscovered)", async () => {
    const category = await Category.findOne({ name: "Test Category" }).lean();
    const res = await agent
      .post("/api/element/add")
      .send({
        name: "Undiscovered Element",
        description: "Test",
        category
      });
    res.should.have.status(201);
    res.body.should
      .be.an("object")
      .have.property("response")
      .contain({
        name: "Undiscovered Element",
        description: "Test",
        category: category._id.toString()
      });
  });
  it("Count elements", done => {
    agent
      .get("/api/elements")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should
          .be.an("object")
          .have.property("response")
          .lengthOf(7);
        done();
      });
  });
  it("Add new element to account", async () => {
    const element = await Element.findOne({ name: "Non-Basic Element" }).lean();
    const res = await agent
      .put("/api/account/element/add")
      .type("form")
      .send({ elementId: element._id.toString() });
    res.should.have.status(200);
    res.body.should
      .be.an("object")
      .have.property("element")
      .contain({
        name: "Non-Basic Element",
        description: "Test"
      });
  });
  it("Reject element creation (already exists)", async () => {
    const category = await Category.findOne({ name: "Test Category" }).lean();
    const res = await agent
      .post("/api/element/add")
      .send({
        name: "Test Element",
        description: "Test",
        category
      });
    res.should.have.status(409);
    res.body.should
      .be.an("object")
      .have.property("error").equal("Element with name 'Test Element' is already exists");
  });
  it("Reject element creation (missing category)", async () => {
    const randomId = generateId();
    const res = await agent
      .post("/api/element/add")
      .send({
        name: "Test Element",
        description: "Test",
        category: randomId
      });
    res.should.have.status(404);
    res.body.should
      .be.an("object")
      .have.property("error").equal(`Category ${randomId} doesn't exist. Element can not be created`);
  });
  it("Update existing element", async () => {
    const element = await Element.findOne({ name: "Test Element" }).lean();
    const category = await Category.findOne({ name: "Test Category" }).lean();
    const res = await agent
      .put("/api/element/update")
      .send({
        elementId: element,
        name: "Updated element name",
        description: "Updated description",
        category
      });
    res.should.have.status(200);
    res.body.should
      .be.an("object")
      .have.property("response")
      .contain({
        name: "Updated element name",
        description: "Updated description"
      });
  });
  it("Reject element update (empty name)", async () => {
    const element = await Element.findOne({ name: "Updated element name" }).lean();
    const res = await agent
      .put("/api/element/update")
      .send({
        elementId: element,
        name: ""
      });
    res.should.have.status(400);
    res.body.should
      .be.an("object")
      .have.property("error").equal("Request has empty name field");
  });
  it("Reject element update (empty description)", async () => {
    const element = await Element.findOne({ name: "Updated element name" }).lean();
    const res = await agent
      .put("/api/element/update")
      .send({
        elementId: element,
        description: ""
      });
    res.should.have.status(400);
    res.body.should
      .be.an("object")
      .have.property("error").equal("Request has empty description field");
  });
  it("Delete element", async () => {
    const element = await Element.findOne({ name: "Updated element name" }).lean();
    const res = await agent
      .delete("/api/element/delete")
      .send({ elementId: element });
    res.should.have.status(200);
    res.body.should
      .be.an("object")
      .have.property("response")
      .have.property("name").equal("Updated element name");
  });
  it("Reject to delete initial element", async () => {
    const element = await Element.findOne({ name: "Water" }).lean();
    const res = await agent
      .delete("/api/element/delete")
      .send({ elementId: element });
    res.should.have.status(400);
    res.body.should
      .be.an("object")
      .have.property("error").equal("This element is one of four initial elements");
  });
});

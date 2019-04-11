const chai = require("chai");
const chaiHttp = require("chai-http");
const supertest = require("supertest");

const { Category } = require("../models/category");
const { Element } = require("../models/element");

const server = require("../server");
const agent = supertest.agent(server);
const { generateId } = require("./helpers");

chai.should();
chai.use(chaiHttp);

describe("Element tests", () => {
  before(done => {
    Element.deleteMany({}, err => err && console.error(err));

    Category.findOne({ name: "Elements" }).lean().exec((error, category) => {
      if (error) return done(error);
      const elements = [
        { name: "Air", category },
        { name: "Earth", category },
        { name: "Fire", category },
        { name: "Water", category }
      ];
      Element.insertMany(elements, error => {
        if (error) return done(error);

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
    });
  });

  it("Count basic elements", done => {
    agent
      .get("/api/elements")
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
  it("Add new element", async () => {
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
  it("Rejects to delete basic element", async () => {
    const element = await Element.findOne({ name: "Water" }).lean();
    const res = await agent
      .delete("/api/element/delete")
      .send({ elementId: element });
    res.should.have.status(400);
    res.body.should
      .be.an("object")
      .have.property("error").equal("This element is one of four basic elements");
  });
});

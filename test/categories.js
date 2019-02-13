require("mongoose");
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
    Category.deleteMany({}, err => err && done(err));

    const newCategory = new Category({ name: "Elements" });
    newCategory.save(error => {
      done(error);
    });
  });

  it("Check basic category", done => {
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
          .have.property("name").equal("Elements");
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
});

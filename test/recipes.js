const chai = require("chai");
const chaiHttp = require("chai-http");
const supertest = require("supertest");

const { Recipe } = require("../models/recipe");
const { Element } = require("../models/element");

const server = require("../server");
const agent = supertest.agent(server);

chai.should();
chai.use(chaiHttp);

describe("Recipe tests", () => {
  before(async () => {
    Recipe.deleteMany({}, err => err && console.error(err));
  });

  it("Add new recipe", async () => {
    const firstElement = await Element.findOne({ name: "Air" }).lean();
    const secondElement = await Element.findOne({ name: "Earth" }).lean();
    const recipe = [firstElement._id.toString(), secondElement._id.toString()];
    const result = await Element.findOne({ name: "Fire" }).lean();
    const res = await agent
      .post("/api/recipe/add")
      .send({
        recipe,
        result: result._id.toString()
      });
    res.should.have.status(201);
    res.body.should
      .be.an("object")
      .have.property("response")
      .have.property("result").equal(result._id.toString());

    res.body.response.recipe.should
      .be.an("array")
      .deep.equal([firstElement._id.toString(), secondElement._id.toString()]);
  });
  it("Reject recipe creation (missing parameters)", async () => {
    const result = await Element.findOne({ name: "Fire" }).lean();
    const res = await agent
      .post("/api/recipe/add")
      .send({
        result: result._id.toString()
      });
    res.should.have.status(400);
    res.body.should
      .be.an("object")
      .have.property("error").equal("Request must contain recipe and result fields");
  });
  it("Reject recipe creation (one element recipe)", async () => {
    const firstElement = await Element.findOne({ name: "Air" }).lean();
    const recipe = [firstElement._id.toString()];
    const result = await Element.findOne({ name: "Fire" }).lean();
    const res = await agent
      .post("/api/recipe/add")
      .send({
        recipe,
        result: result._id.toString()
      });
    res.should.have.status(400);
    res.body.should
      .be.an("object")
      .have.property("error").equal("Recipe must contain at least 2 elements");
  });
  it("Reject recipe creation (already exists)", async () => {
    const firstElement = await Element.findOne({ name: "Air" }).lean();
    const secondElement = await Element.findOne({ name: "Earth" }).lean();
    const recipe = [firstElement._id.toString(), secondElement._id.toString()];
    const result = await Element.findOne({ name: "Fire" }).lean();
    const res = await agent
      .post("/api/recipe/add")
      .send({
        recipe,
        result: result._id.toString()
      });
    res.should.have.status(409);
    res.body.should
      .be.an("object")
      .have.property("error").equal("This recipe is already exists");
  });
  it("Reject recipe creation (result not exists)", async () => {
    const generateId = (rnd = r16 => Math.floor(r16).toString(16)) =>
      rnd(Date.now() / 1000) + " ".repeat(16).replace(/./g, () => rnd(Math.random() * 16));
    const randomId = generateId();
    const firstElement = await Element.findOne({ name: "Air" }).lean();
    const secondElement = await Element.findOne({ name: "Earth" }).lean();
    const recipe = [firstElement._id.toString(), secondElement._id.toString()];
    const res = await agent
      .post("/api/recipe/add")
      .send({
        recipe,
        result: randomId
      });
    res.should.have.status(404);
    res.body.should
      .be.an("object")
      .have.property("error").equal(`Element ${randomId} doesn't exist. Recipe can not be created`);
  });
  it("Reject recipe creation (recipe element not exists)", async () => {
    const generateId = (rnd = r16 => Math.floor(r16).toString(16)) =>
      rnd(Date.now() / 1000) + " ".repeat(16).replace(/./g, () => rnd(Math.random() * 16));
    const randomId = generateId();
    const secondElement = await Element.findOne({ name: "Earth" }).lean();
    const recipe = [randomId, secondElement._id.toString()];
    const result = await Element.findOne({ name: "Fire" }).lean();
    const res = await agent
      .post("/api/recipe/add")
      .send({
        recipe,
        result: result._id.toString()
      });
    res.should.have.status(404);
    res.body.should
      .be.an("object")
      .have.property("error").equal("Some elements doesn't exist. Recipe can not be created");
  });
  it("Get recipes", done => {
    agent
      .get("/api/recipes")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should
          .be.an("object")
          .have.property("response")
          .lengthOf(1);
        done();
      });
  });
  it("Reject recipe update (missing parameters)", async () => {
    const result = await Element.findOne({ name: "Fire" }).lean();
    const res = await agent
      .post("/api/recipe/add")
      .send({
        newResult: result._id.toString()
      });
    res.should.have.status(400);
    res.body.should
      .be.an("object")
      .have.property("error").equal("Request must contain recipe and result fields");
  });
  it("Reject recipe update (one element recipe)", async () => {
    const firstElement = await Element.findOne({ name: "Fire" }).lean();
    const recipeId = await Recipe.findOne({ result: firstElement }).lean();
    const newRecipe = [firstElement._id.toString()];
    const newResult = await Element.findOne({ name: "Fire" }).lean();
    const res = await agent
      .put("/api/recipe/update")
      .send({
        recipeId,
        newRecipe,
        newResult: newResult._id.toString()
      });
    res.should.have.status(400);
    res.body.should
      .be.an("object")
      .have.property("error").equal("Recipe must contain at least 2 elements");
  });
  it("Reject recipe update (result not exists)", async () => {
    const generateId = (rnd = r16 => Math.floor(r16).toString(16)) =>
      rnd(Date.now() / 1000) + " ".repeat(16).replace(/./g, () => rnd(Math.random() * 16));
    const randomId = generateId();
    const firstElement = await Element.findOne({ name: "Air" }).lean();
    const secondElement = await Element.findOne({ name: "Fire" }).lean();
    const newRecipe = [firstElement._id.toString(), secondElement._id.toString()];
    const recipeId = await Recipe.findOne({ result: secondElement }).lean();
    const res = await agent
      .put("/api/recipe/update")
      .send({
        recipeId,
        newRecipe,
        newResult: randomId
      });
    res.should.have.status(404);
    res.body.should
      .be.an("object")
      .have.property("error").equal(`Element ${randomId} doesn't exist. Recipe can not be updated`);
  });
  it("Reject recipe update (recipe element not exists)", async () => {
    const generateId = (rnd = r16 => Math.floor(r16).toString(16)) =>
      rnd(Date.now() / 1000) + " ".repeat(16).replace(/./g, () => rnd(Math.random() * 16));
    const randomId = generateId();
    const secondElement = await Element.findOne({ name: "Fire" }).lean();
    const newRecipe = [randomId, secondElement._id.toString()];
    const recipeId = await Recipe.findOne({ result: secondElement }).lean();
    const newResult = await Element.findOne({ name: "Air" }).lean();
    const res = await agent
      .put("/api/recipe/update")
      .send({
        recipeId,
        newRecipe,
        newResult: newResult._id.toString()
      });
    res.should.have.status(404);
    res.body.should
      .be.an("object")
      .have.property("error").equal("Some elements doesn't exist. Recipe can not be updated");
  });
  it("Update existing recipe", async () => {
    const firstElement = await Element.findOne({ name: "Earth" }).lean();
    const secondElement = await Element.findOne({ name: "Fire" }).lean();
    const recipeId = await Recipe.findOne({ result: secondElement }).lean();
    const newRecipe = [firstElement._id.toString(), secondElement._id.toString()];
    const newResult = await Element.findOne({ name: "Air" }).lean();
    const res = await agent
      .put("/api/recipe/update")
      .send({
        recipeId,
        newRecipe,
        newResult: newResult._id.toString()
      });
    res.should.have.status(200);
    res.body.should
      .be.an("object")
      .have.property("response")
      .have.property("result").equal(newResult._id.toString());

    res.body.response.recipe.should
      .be.an("array")
      .deep.equal([firstElement._id.toString(), secondElement._id.toString()]);
  });
  it("Reject recipe deletion (missing recipeId field)", async () => {
    const res = await agent
      .delete("/api/recipe/delete")
      .send({});
    res.should.have.status(400);
    res.body.should
      .be.an("object")
      .have.property("error").equal("Request must contain recipeId field");
  });
  it("Delete recipe", async () => {
    const resultElement = await Element.findOne({ name: "Air" }).lean();
    const recipe = await Recipe.findOne({ result: resultElement }).lean();
    const res = await agent
      .delete("/api/recipe/delete")
      .send({ recipeId: recipe });
    res.should.have.status(200);
    res.body.should
      .be.an("object")
      .have.property("response")
      .have.property("result").equal(resultElement._id.toString());
  });
});

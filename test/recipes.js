const { Recipe } = require("../models/recipe");
const { Element } = require("../models/element");
const { generateId } = require("./helpers");

const supertest = require("supertest");
const server = require("../server");
const agent = supertest.agent(server);

describe("Recipe tests", () => {
  before(done => {
    Recipe.deleteMany({}, err => err && console.error(err));
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
  it("Reject recipe creation (missing recipe field)", async () => {
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
  it("Reject recipe creation (result not exists)", async () => {
    const firstElement = await Element.findOne({ name: "Air" }).lean();
    const secondElement = await Element.findOne({ name: "Earth" }).lean();
    const recipe = [firstElement._id.toString(), secondElement._id.toString()];
    const result = generateId();
    const res = await agent
      .post("/api/recipe/add")
      .send({
        recipe,
        result
      });
    res.should.have.status(404);
    res.body.should
      .be.an("object")
      .have.property("error").equal(`Element ${result} doesn't exist. Recipe can not be created`);
  });
  it("Reject recipe creation (recipe element not exists)", async () => {
    const firstElement = generateId();
    const secondElement = await Element.findOne({ name: "Earth" }).lean();
    const recipe = [firstElement, secondElement._id.toString()];
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
          .be.an("array")
          .lengthOf(1);
        res.body.response[0].should
          .be.an("object")
          .include.keys(["result", "recipe"]);
        res.body.response[0].result.should
          .be.an("object")
          .include.keys(["_id", "name"]);
        res.body.response[0].result.category[0].should
          .be.an("object")
          .include.keys(["_id", "name"]);
        res.body.response[0].recipe.should
          .be.an("array")
          .lengthOf(2);
        done();
      });
  });
  it("Check recipe", async () => {
    const firstElement = await Element.findOne({ name: "Air" }).lean();
    const secondElement = await Element.findOne({ name: "Earth" }).lean();
    const res = await agent
      .get("/api/recipe/check")
      .query({ recipe: [firstElement._id.toString(), secondElement._id.toString()] });
    res.should.have.status(201);
    res.body.should
      .be.an("object")
      .have.property("response")
      .be.an("object").include.keys(["result", "recipe"]);
    res.body.response.result.should
      .be.an("object")
      .include.keys(["_id", "category"])
      .have.property("name").that.equals("Fire");
  });
  it("Update existing recipe", async () => {
    const firstElement = await Element.findOne({ name: "Earth" }).lean();
    const secondElement = await Element.findOne({ name: "Fire" }).lean();
    const newRecipe = [firstElement._id.toString(), secondElement._id.toString()];
    const newResult = await Element.findOne({ name: "Air" }).lean();
    const recipeId = await Recipe.findOne({ result: secondElement }).lean();
    const res = await agent
      .put("/api/recipe/update")
      .send({
        newRecipe,
        newResult: newResult._id.toString(),
        recipeId
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
  it("Reject recipe update (missing parameters)", async () => {
    const result = await Element.findOne({ name: "Air" }).lean();
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
    const newRecipe = [firstElement._id.toString()];
    const oldResult = await Element.findOne({ name: "Air" }).lean();
    const newResult = await Element.findOne({ name: "Water" }).lean();
    const recipeId = await Recipe.findOne({ result: oldResult }).lean();
    const res = await agent
      .put("/api/recipe/update")
      .send({
        newRecipe,
        newResult: newResult._id.toString(),
        recipeId
      });
    res.should.have.status(400);
    res.body.should
      .be.an("object")
      .have.property("error").equal("Recipe must contain at least 2 elements");
  });
  it("Reject recipe update (result not exists)", async () => {
    const firstElement = await Element.findOne({ name: "Fire" }).lean();
    const secondElement = await Element.findOne({ name: "Earth" }).lean();
    const newRecipe = [firstElement._id.toString(), secondElement._id.toString()];
    const oldResult = await Element.findOne({ name: "Air" }).lean();
    const newResult = generateId();
    const recipeId = await Recipe.findOne({ result: oldResult }).lean();
    const res = await agent
      .put("/api/recipe/update")
      .send({
        newRecipe,
        newResult,
        recipeId
      });
    res.should.have.status(404);
    res.body.should
      .be.an("object")
      .have.property("error").equal(`Element ${newResult} doesn't exist. Recipe can not be updated`);
  });
  it("Reject recipe update (recipe element not exists)", async () => {
    const firstElement = generateId();
    const secondElement = await Element.findOne({ name: "Earth" }).lean();
    const newRecipe = [firstElement, secondElement._id.toString()];
    const oldResult = await Element.findOne({ name: "Air" }).lean();
    const newResult = await Element.findOne({ name: "Water" }).lean();
    const recipeId = await Recipe.findOne({ result: oldResult }).lean();
    const res = await agent
      .put("/api/recipe/update")
      .send({
        newRecipe,
        newResult: newResult._id.toString(),
        recipeId
      });
    res.should.have.status(404);
    res.body.should
      .be.an("object")
      .have.property("error").equal("Some elements doesn't exist. Recipe can not be updated");
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
  it("Reject recipe deletion (missing recipeId field)", async () => {
    const res = await agent
      .delete("/api/recipe/delete")
      .send({});
    res.should.have.status(400);
    res.body.should
      .be.an("object")
      .have.property("error").equal("Request must contain recipeId field");
  });
});

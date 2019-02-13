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
  it("Delete element", async () => {
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

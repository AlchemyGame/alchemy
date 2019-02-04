module.exports = {
  getRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe
};

const mongoose = require("mongoose");

const { Recipe } = require("../models/recipe");
const { Element } = require("../models/element");

function getRecipes(req, res) {
  const pipeline = [
    { $unwind: "$recipe" },
    { $lookup: {
      from: "elements",
      localField: "recipe",
      foreignField: "_id",
      as: "recipe"
    }},
    { $lookup: {
      from: "elements",
      localField: "result",
      foreignField: "_id",
      as: "result"
    }},
    { $unwind: "$result" },
    { $unwind: "$recipe" },
    { $group: {
      _id: "$_id",
      result: { $first: "$result" },
      recipe: { $push: "$recipe" }
    }},
    { $project: {
      __v: 0,
      recipe: {
        category: 0,
        __v: 0
      },
      result: {
        category: 0,
        __v: 0
      }
    }}
  ];
  Recipe.aggregate(pipeline).exec((err, recipes) => {
    if (err) return res.status(500).json({err});
    return res.status(200).json({response: recipes});
  });
}

async function addRecipe(req, res) {
  const { recipe, result } = req.body;
  if (!recipe || !result) return res.status(400).json({
    error: `Request must contain recipe and result fields`
  });
  if (recipe.length < 2) return res.status(400).json({
    error: `Recipe must contain at least 2 elements`
  });
  recipe.sort((a, b) => a < b ? -1 : (a > b) ? 1 : 0);

  const resultData = await Element.findById(mongoose.Types.ObjectId(result)).lean();
  if (!resultData) return res.status(404).json({
    error: `Element ${result} doesn't exist. Recipe can not be created`
  });

  const countUnique = arr => new Set(arr).size;

  const recipeElements = await Element.find({ _id: { $in: recipe } }).lean();
  if (countUnique(recipe) === recipeElements.length) {
    Recipe.findOne({
      recipe,
      result: resultData._id
    }, (error, existingRecipe) => {
      if (error) return res.status(500).json({error});
      if (!existingRecipe) {
        const newRecipe = new Recipe({
          recipe,
          result: resultData._id
        });
        newRecipe.save(error => {
          if (error) return res.status(500).json({ error });
          return res.status(201).json({ response: newRecipe });
        });
      } else {
        return res.status(409).json({
          error: `This recipe is already exists`
        });
      }
    });
  } else {
    const toRemove = recipeElements.map(el => el._id.toString());
    const notFound = recipe.filter(el => !toRemove.includes(el));
    return res.status(404).json({
      error: `Some elements doesn't exist. Recipe can not be created`,
      notFound
    });
  }
}

async function updateRecipe(req, res) {
  const { recipeId, newRecipe, newResult } = req.body;
  if (!recipeId || !newRecipe || !newResult) return res.status(400).json({
    error: `Request must contain recipeId, newRecipe and newResult fields`
  });
  if (newRecipe.length < 2) return res.status(400).json({
    error: `Recipe must contain at least 2 elements`
  });
  newRecipe.sort((a, b) => a < b ? -1 : (a > b) ? 1 : 0);

  const resultData = await Element.findById(mongoose.Types.ObjectId(newResult)).lean();
  if (!resultData) return res.status(404).json({
    error: `Element ${newResult} doesn't exist. Recipe can not be updated`
  });

  const countUnique = arr => new Set(arr).size;

  const recipeElements = await Element.find({ _id: { $in: newRecipe } }).lean();
  if (countUnique(newRecipe) === recipeElements.length) {
    Recipe.findByIdAndUpdate(
      recipeId,
      {
        recipe: newRecipe,
        result: resultData._id
      },
      { new: true },
      (error, newRecipe) => {
        if (error) return res.status(500).json({ error });
        return res.status(201).json({ response: newRecipe });
      });
  } else {
    const toRemove = recipeElements.map(el => el._id.toString());
    const notFound = newRecipe.filter(el => !toRemove.includes(el));
    return res.status(404).json({
      error: `Some elements doesn't exist. Recipe can not be updated`,
      notFound
    });
  }
}

function deleteRecipe(req, res) {
  const { recipeId } = req.body;
  if (!recipeId) return res.status(400).json({
    error: `Request must contain recipeId field`
  });

  Recipe.findByIdAndRemove(recipeId, (error, response) => {
    if (error) return res.status(500).json({ error });
    return res.status(200).json({ response });
  });
}

const express = require("express");
const router = express.Router();

const {
  getElements,
  addElement
} = require("../api/elements");

const {
  getCategories,
  addCategory
} = require("../api/categories");

const {
  getRecipes,
  addRecipe
} = require("../api/recipes");

router.get("/elements", getElements);
router.post("/element/add", addElement);

router.get("/categories", getCategories);
router.post("/category/add", addCategory);

router.get("/recipes", getRecipes);
router.post("/recipe/add", addRecipe);

module.exports = router;

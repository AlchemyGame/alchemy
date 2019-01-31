const express = require("express");
const router = express.Router();

const {
  getElements
} = require("../api/elements");

const {
  getCategories
} = require("../api/categories");

const {
  getRecipes
} = require("../api/recipes");

router.get("/elements", getElements);

router.get("/categories", getCategories);

router.get("/recipes", getRecipes);

module.exports = router;

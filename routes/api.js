const express = require("express");
const router = express.Router();

const {
  getElements,
  addElement,
  updateElement,
  deleteElement
} = require("../api/elements");

const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory
} = require("../api/categories");

const {
  getRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe
} = require("../api/recipes");

router.get("/elements", getElements);
router.post("/element/add", addElement);
router.put("/element/update", updateElement);
router.delete("/element/delete", deleteElement);

router.get("/categories", getCategories);
router.post("/category/add", addCategory);
router.put("/category/update", updateCategory);
router.delete("/category/delete", deleteCategory);

router.get("/recipes", getRecipes);
router.post("/recipe/add", addRecipe);
router.put("/recipe/update", updateRecipe);
router.delete("/recipe/delete", deleteRecipe);

module.exports = router;

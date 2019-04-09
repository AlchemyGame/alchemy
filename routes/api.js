const express = require("express");
const router = express.Router();

const {
  login,
  checkSession,
  logout,
  getUsersList,
  createAccount,
  updateInfo,
  changeAccountStatus,
  resetPassword,
  updatePassword
} = require("../api/users");

const {
  getStats
} = require ("../api/stats");

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

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: "Authentication is required to perform this action" });
}

function isAdmin(req, res, next) {
  if (req.user.role === "Admin") return next();
  res.status(403).json({ error: "You are not authorized to perform this action" });
}

router.post("/login", login);
router.get("/login", checkSession);
router.get("/logout", isAuthenticated, logout);

router.get("/stats", getStats);

router.get("/users", isAuthenticated, isAdmin, getUsersList);
router.post("/account/add", isAuthenticated, isAdmin, createAccount);
router.put("/account/update", isAuthenticated, isAdmin, updateInfo);
router.put("/account/disable", isAuthenticated, isAdmin, changeAccountStatus);
router.put("/account/password/reset", resetPassword);
router.put("/account/password/update", isAuthenticated, updatePassword);

router.get("/elements", isAuthenticated, getElements);
router.post("/element/add", isAuthenticated, isAdmin, addElement);
router.put("/element/update", isAuthenticated, isAdmin, updateElement);
router.delete("/element/delete", isAuthenticated, isAdmin, deleteElement);

router.get("/categories", isAuthenticated, getCategories);
router.post("/category/add", isAuthenticated, isAdmin, addCategory);
router.put("/category/update", isAuthenticated, isAdmin, updateCategory);
router.delete("/category/delete", isAuthenticated, isAdmin, deleteCategory);

router.get("/recipes", isAuthenticated, getRecipes);
router.post("/recipe/add", isAuthenticated, isAdmin, addRecipe);
router.put("/recipe/update", isAuthenticated, isAdmin, updateRecipe);
router.delete("/recipe/delete", isAuthenticated, isAdmin, deleteRecipe);

module.exports = router;

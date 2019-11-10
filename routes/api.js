const express = require("express");
const router = express.Router();

const {
  login,
  checkSession,
  logout,
  resetPassword,
  getUsersList,
  createAccount,
  changeAccountInfo,
  changeAccountStatus,
  changeAccountRole,
  changeAccountPassword,
  getUserElements,
  addUserElement
} = require("../api/users");

const {
  getStats
} = require("../api/stats");

const {
  getInitialElements,
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
  checkRecipe,
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
router.put("/account/password/reset", resetPassword);

router.get("/stats", isAuthenticated, getStats);

router.get("/users", isAuthenticated, isAdmin, getUsersList);
router.post("/account/add", createAccount);
router.put("/account/update", isAuthenticated, changeAccountInfo);
router.put("/account/disable", isAuthenticated, isAdmin, changeAccountStatus);
router.put("/account/role/update", isAuthenticated, isAdmin, changeAccountRole);
router.put("/account/password/update", isAuthenticated, changeAccountPassword);
router.get("/account/elements", isAuthenticated, getUserElements);
router.put("/account/element/add", isAuthenticated, addUserElement);

router.get("/initialElements", getInitialElements);
router.get("/elements", isAuthenticated, isAdmin, getElements);
router.post("/element/add", isAuthenticated, isAdmin, addElement);
router.put("/element/update", isAuthenticated, isAdmin, updateElement);
router.delete("/element/delete", isAuthenticated, isAdmin, deleteElement);

router.get("/categories", isAuthenticated, getCategories);
router.post("/category/add", isAuthenticated, isAdmin, addCategory);
router.put("/category/update", isAuthenticated, isAdmin, updateCategory);
router.delete("/category/delete", isAuthenticated, isAdmin, deleteCategory);

router.get("/recipe/check", isAuthenticated, checkRecipe);
router.get("/recipes", isAuthenticated, isAdmin, getRecipes);
router.post("/recipe/add", isAuthenticated, isAdmin, addRecipe);
router.put("/recipe/update", isAuthenticated, isAdmin, updateRecipe);
router.delete("/recipe/delete", isAuthenticated, isAdmin, deleteRecipe);

module.exports = router;

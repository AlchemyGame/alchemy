module.exports = {
    getRecipes
};

const { Recipe } = require("../models/recipe");

function getRecipes(req, res) {
    Recipe.find({}, (err, recipes) => {
        res.status(200).json({response: recipes});
    });
}

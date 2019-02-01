module.exports = {
    getRecipes,
    addRecipe
};

const mongoose = require("mongoose");

const { Recipe } = require("../models/recipe");
const { Element } = require("../models/element");

function getRecipes(req, res) {
    const pipeline = [
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
    const { result, recipe } = req.body;
    if (!result || ! recipe) {
        return res.status(400).json({ error: `Request must contain result and recipe fields` });
    }
    if (recipe.length < 2) {
        return res.status(400).json({
            error: `Recipe must contain at least 2 elements`
        });
    }
    const resultData = await Element.findById(mongoose.Types.ObjectId(result)).lean();
    if (!resultData) {
        return res.status(404).json({
            error: `Element ${result} doesn't exists. Recipe can not be created`
        });
    }
    recipe.map(async recipeElement =>
        await Element.findById(recipeElement).lean().exec((err, element) => {
            if (!element) return res.status(404).json({
                error: `Element '${recipeElement}' doesn't exists. Recipe can not be created`
            });
        })
    );

    const recipeArr = recipe.sort((a, b) => a < b ? -1 : (a > b) ? 1 : 0);
    Recipe.findOne({
        recipe: recipeArr,
        result: resultData._id
    }, (error, recipe) => {
        if (error) return res.status(500).json({error});
        if (!recipe) {
            const newRecipe = new Recipe({
                recipe: recipeArr,
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
}

module.exports = {
    getRecipes,
    addRecipe
};

const { Recipe } = require("../models/recipe");
const { Element } = require("../models/element");

function getRecipes(req, res) {
    const pipeline = [
        { $lookup: {
            from: "elements",
            localField: "result",
            foreignField: "_id",
            as: "result"
        }},
        { $lookup: {
            from: "elements",
            localField: "firstElement",
            foreignField: "_id",
            as: "firstElement"
        }},
        { $lookup: {
            from: "elements",
            localField: "secondElement",
            foreignField: "_id",
            as: "secondElement"
        }},
        { $unwind: "$result" },
        { $unwind: "$firstElement" },
        { $unwind: "$secondElement" },
        { $project: {
            __v: 0,
            result: {
                category: 0,
                __v: 0
            },
            firstElement: {
                category: 0,
                __v: 0
            },
            secondElement: {
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
    const { firstElement, secondElement, result } = req.body;
    const firstElementData = await Element.findById(firstElement);
    const secondElementData = await Element.findById(secondElement);
    const resultData = await Element.findById(result);

    if (!firstElementData || !secondElementData || !resultData ) {
        return res.status(404).json({
            error: `One of the elements doesn't exists.  Recipe can not be created`,
            request: {
                firstElementData,
                secondElementData,
                resultData
            }
        });
    }

    Recipe.findOne({
        firstElement: firstElementData._id,
        secondElement: secondElementData._id,
        result: resultData._id
    }, (error, recipe) => {
        if (error) return res.status(500).json({error});
        if (!recipe) {
            const newRecipe = new Recipe({
                firstElement: firstElementData._id,
                secondElement: secondElementData._id,
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

module.exports = {
    getRecipes,
    addRecipe
};

const { Recipe } = require("../models/recipe");
const { Element } = require("../models/element");

function getRecipes(req, res) {
    Recipe.find({}, (err, recipes) => {
        res.status(200).json({response: recipes});
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

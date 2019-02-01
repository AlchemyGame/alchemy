module.exports = {
    getCategories,
    addCategory
};

const { Category } = require("../models/category");

function getCategories(req, res) {
    const pipeline = [
        { $lookup: {
            from: "elements",
            localField: "_id",
            foreignField: "category",
            as: "elements"
        }},
        { $project: {
            __v: 0,
            elements: {
                category: 0,
                __v: 0
            }
        }}
    ];
    Category.aggregate(pipeline).exec((err, categories) => {
        if (err) return res.status(500).json({err});
        return res.status(200).json({response: categories});
    });
}

async function addCategory(req, res) {
    const {name} = req.body;

    Category.findOne({name}, (error, category) => {
        if (error) return res.status(500).json({error});
        if (!category) {
            const newCategory = new Category({name});
            newCategory.save(error => {
                if (error) return res.status(500).json({ error });
                return res.status(201).json({ response: newCategory });
            });
        } else {
            return res.status(409).json({
                error: `Category with name '${name}' is already exists`
            });
        }
    });
}

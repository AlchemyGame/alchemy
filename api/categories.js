module.exports = {
    getCategories
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
        res.status(200).json({response: categories});
    });
}

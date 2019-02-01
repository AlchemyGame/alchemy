module.exports = {
    getElements
};

const { Element } = require("../models/element");

function getElements(req, res) {
    const pipeline = [
        { $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category"
        }},
        { $unwind: "$category" },
        { $project: {
            name: 1,
            category: "$category.name"
        }}
    ];
    Element.aggregate(pipeline).exec((err, elements) => {
        if (err) return res.status(500).json({err});
        return res.status(200).json({response: elements});
    });
}

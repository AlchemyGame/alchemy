module.exports = {
    getCategories
};

const { Category } = require("../models/category");

function getCategories(req, res) {
    Category.find({}, (err, categories) => {
        res.status(200).json({response: categories});
    });
}

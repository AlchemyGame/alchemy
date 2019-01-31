module.exports = {
    getElements
};

const { Element } = require("../models/element");

function getElements(req, res) {
    Element.find({}, (err, elements) => {
        res.status(200).json({response: elements});
    });
}

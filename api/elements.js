module.exports = {
  getElements,
  addElement
};

const { Element } = require("../models/element");
const { Category } = require("../models/category");

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
      description: 1,
      category: "$category.name"
    }}
  ];
  Element.aggregate(pipeline).exec((err, elements) => {
    if (err) return res.status(500).json({err});
    return res.status(200).json({response: elements});
  });
}

async function addElement(req, res) {
  const { name, category } = req.body;
  const categoryData = await Category.findById(category);

  if (!categoryData) {
    return res.status(404).json({
      error: `Category ${category} doesn't exists.  Element can not be created`
    });
  }

  Element.findOne({name}, (error, element) => {
    if (error) return res.status(500).json({error});
    if (!element) {
      const newElement = new Element({ name, category });
      newElement.save(error => {
        if (error) return res.status(500).json({ error });
        return res.status(201).json({ response: newElement });
      });
    } else {
      return res.status(409).json({ error: `Element with name '${name}' is already exists` });
    }
  });
}

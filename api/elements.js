module.exports = {
  getElements,
  addElement,
  deleteElement
};

const { Element } = require("../models/element");
const { Category } = require("../models/category");
const { Recipe } = require("../models/recipe");

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

async function deleteElement(req, res) {
  const {elementId} = req.body;

  const pipeline = [
    { $project: {
      _id: 0,
      __v: 0
    }},
    { $unwind: "$recipe" }
  ];

  let list = new Set();
  const elements = await Recipe.aggregate(pipeline);
  elements.map(element => {
    list.add(element.recipe.toString());
    list.add(element.result.toString());
  });
  list = [...list];

  if (list.includes(elementId)) return res.status(400).json({
    error: `This element is used in the recipe. You have to change the recipe before deleting this element`
  });

  Element.findByIdAndRemove(elementId, (error, response) => {
    if (error) return res.status(500).json({ error });
    return res.status(200).json({ response });
  });
}

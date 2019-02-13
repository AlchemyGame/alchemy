module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory
};

const { Category } = require("../models/category");
const { Element } = require("../models/element");

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

function updateCategory(req, res) {
  const { categoryId, name } = req.body;
  if (!categoryId || !name) {
    return res.status(400).json({ error: `Request must contain categoryId and name fields` });
  }

  Category.findByIdAndUpdate(
    categoryId,
    { name },
    { new: true },
    (error, newCategory) => {
      if (error) return res.status(500).json({ error });
      return res.status(200).json({ response: newCategory });
    }
  );
}

async function deleteCategory(req, res) {
  const { categoryId } = req.body;

  const elementsCount = await Element.countDocuments({ category: categoryId }).lean();
  if (elementsCount !== 0) return res.status(400).json({
    error: `There are ${elementsCount} elements in this category. You have to move them to another category before deleting this category`
  });

  Category.findByIdAndRemove(categoryId, (error, response) => {
    if (error) return res.status(500).json({ error });
    return res.status(200).json({ response });
  });
}

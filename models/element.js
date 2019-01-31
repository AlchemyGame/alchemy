const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { Category } = require("../models/category");

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  }
});

const Element = exports.Element = mongoose.model("Element", schema);

Element.findOne({}, async (err, el) => {
  if (err) return err;
  if (!el) {
    const category = await Category.findOne({ name: "Основные" });
    elements = [
      { name: "Вода", category },
      { name: "Земля", category },
      { name: "Воздух", category },
      { name: "Огонь", category }
    ];

    Element.insertMany(elements, (error, elements) => {
      if (error) return error;
      console.log({ elements });
    });
  }
});

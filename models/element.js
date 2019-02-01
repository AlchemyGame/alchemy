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
    ref: "Category",
    required: true
  }
});

const Element = exports.Element = mongoose.model("Element", schema);

Element.findOne({}, async (err, el) => {
  if (err) return err;
  if (!el) {
    const category = await Category.findOne({ name: "Elements" });
    elements = [
      { name: "Air", category },
      { name: "Earth", category },
      { name: "Fire", category },
      { name: "Water", category }
    ];

    Element.insertMany(elements, (error, elements) => {
      if (error) return error;
      console.log({ elements });
    });
  }
});

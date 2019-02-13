const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { Category } = require("../models/category");

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }
});

const Element = exports.Element = mongoose.model("Element", schema);

if (process.env.NODE_ENV === "test") return;

Category.findOne({}, (error, cat) => {
  if (error) return error;
  if (!cat) {
    const newCategory = new Category({ name: "Elements" });
    newCategory.save((error, category) => {
      if (error) console.error({ error });
      console.log({ category });
      Element.findOne({}, async (error, element) => {
        if (error) console.error({ error });
        if (!element) {
          const elements = [
            { name: "Air", category },
            { name: "Earth", category },
            { name: "Fire", category },
            { name: "Water", category }
          ];

          Element.insertMany(elements, (error, elements) => {
            if (error) console.error({ error });
            console.log({ elements });
          });
        }
      });
    });
  }
});

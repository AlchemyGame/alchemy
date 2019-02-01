const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const Category = exports.Category = mongoose.model("Category", schema);

Category.findOne({}, (err, cat) => {
  if (err) return err;
  if (!cat) {
    newCategory = new Category({ name: "Elements" });
    newCategory.save(err => {
      console.log({err, newCategory});
    });
  }
});

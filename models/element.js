const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

exports.Element = mongoose.model("Element", schema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  result: {
    type: Schema.Types.ObjectId,
    ref: "Element",
    required: true
  },
  recipe: [{
    type: Schema.Types.ObjectId,
    ref: "Element",
    required: true
  }]
});

exports.Recipe = mongoose.model("Recipe", schema);

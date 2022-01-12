const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dataSchema = new Schema({
  number: {
    type: Number,
    require: true,
  },
  number_one: {
    type: Number,
    require: true,
  },
  number_two: {
    type: Number,
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
});

const dataModel = mongoose.model("data", dataSchema);
module.exports = dataModel;

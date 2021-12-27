const mongoose = require("mongoose");

const expenceSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  vat: {
    type: Boolean,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Expences", expenceSchema);

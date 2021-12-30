const mongoose = require("mongoose");

const expense2Schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  expenses: {
    year: {
      type: Object,
      required: true,
      month: {
        type: Object,
        required: true,
        expenseName: {
          type: String,
          required: true,
        },
        vat: {
          type: Boolean,
          required: true,
        },

        cost: {
          type: Number,
        },
      },
    },
  },
});

module.exports = mongoose.model("Expenses2", expense2Schema);

const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    sum: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: [true, "Please provide a type"],
      enum: {
        values: ["one-time", "monthly"],
        message: "{VALUE} is not supported",
      },
      default: "one-time",
    },
    createdBy: {
      type: mongoose.Types.ObjectId, // one to many relationship (many expenses one user)
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);

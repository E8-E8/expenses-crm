const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    seen: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdByName: {
      type: String,
      required: [true, "Please enter the name of the user"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId, // one to many relationship (many expenses one user)
      ref: "User",
      required: [true, "Please provide a user"],
    },
    createdFor: {
      type: mongoose.Types.ObjectId, // one to many relationship (many expenses one user)
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);

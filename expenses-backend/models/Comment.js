const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    parentId: {
      type: mongoose.Types.ObjectId,
      required: [true, "Please provide a parent"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId, // one to many relationship (many expenses one user)
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);

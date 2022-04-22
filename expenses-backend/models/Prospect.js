const mongoose = require("mongoose");

const ProspectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["hot", "default"],
        message: "{VALUE} is not supported",
      },
      default: "default",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prospect", ProspectSchema);

const mongoose = require("mongoose");

const ProspectSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
    },
    brand: {
      type: String,
      default: "did not answer",
    },
    position: {
      type: String,
      default: "did not answer",
    },
    website: {
      type: String,
      default: "did not answer",
    },

    fullname: {
      type: String,
      default: "did not answer",
    },
    country: {
      type: String,
      default: "did not answer",
    },
    email: {
      type: String,
      default: "did not answer",
      unique: true,
    },

    question1: {
      type: Object,
      default: {
        answer: false,
      },
    },
    question2: {
      type: Object,
      default: {
        answer: false,
      },
    },
    question3: {
      type: Object,
      default: {
        answer: false,
      },
    },
    question4: {
      type: Object,
      default: "did not answer",
    },
    question5: {
      type: Object,
      default: "did not answer",
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

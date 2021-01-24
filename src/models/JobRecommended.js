import mongoose from "mongoose";
import normalize from "normalize-mongoose";
var uniqueValidator = require("mongoose-unique-validator");

var RecommendedFields = {
  candidateEmail: {
    type: String,
    required: true,
  },
  matchingFactor: {
    type: Number,
  },
  jobAdd: {
    _id: false,
    _id: {
      type: String,
    },
    hasApplied: {
      type: Boolean,
    },
    hasSaved: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    company: {
      type: String,
    },
    companyid: {
      type: String,
    },
    companylogo: {
      type: String,
    },
    location: {
      type: String,
    },
    type: {
      //Perm / Contract / Parttimee
      type: String,
    },
    salaryMin: {
      type: Number,
    },
    salarymax: {
      type: Number,
    },
    expireDate: {
      type: String,
    },
    updatedat: {
      type: String,
    },
  },
};

var RecommendedSchema = new mongoose.Schema(RecommendedFields, {
  timestamps: {
    createdAt: "createdat",
    updatedAt: "updatedat",
    autoCreate: true,
  },
});

RecommendedSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

RecommendedSchema.plugin(normalize); //replace _id with id and remove v

var Recommended = mongoose.model("Recommended", RecommendedSchema);

export default Recommended;

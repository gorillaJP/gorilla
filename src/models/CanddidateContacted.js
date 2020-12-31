import mongoose from "mongoose";
import normalize from "normalize-mongoose";
var uniqueValidator = require("mongoose-unique-validator");

var CandidateContactedFields = {
  employerEmail: {
    type: String,
    index: true,
    required: true,
  },
  candidateEmail: {
    type: String,
    index: true,
    required: true,
  },
  message: {
    type: String,
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

var CandidateContactedSchema = new mongoose.Schema(CandidateContactedFields, {
  timestamps: {
    createdAt: "createdat",
    updatedAt: "updatedat",
    autoCreate: true,
  },
});

CandidateContactedSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

CandidateContactedSchema.plugin(normalize); //replace _id with id and remove v

var CandidateContacted = mongoose.model(
  "CandidateContacted",
  CandidateContactedSchema
);

export default CandidateContacted;

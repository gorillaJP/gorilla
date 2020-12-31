import mongoose from "mongoose";
import normalize from "normalize-mongoose";
var uniqueValidator = require("mongoose-unique-validator");

var JobSavedFields = {
  email: {
    type: String,
    index: true,
    required: true,
  },
  jobId: {
    type: String,
    index: true,
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

var JobSavedSchema = new mongoose.Schema(JobSavedFields, {
  timestamps: {
    createdAt: "createdat",
    updatedAt: "updatedat",
    autoCreate: true,
  },
});

JobSavedSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

//CandidateSchema.plugin(findOrCreate);

JobSavedSchema.plugin(normalize); //replace _id with id and remove v

var JobSaved = mongoose.model("JobSaved", JobSavedSchema);

export default JobSaved;

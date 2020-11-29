import mongoose from "mongoose";
import normalize from "normalize-mongoose";
var uniqueValidator = require("mongoose-unique-validator");
//var findOrCreate = require("mongoose-findorcreate");

var JobApplicationFields = {
  email: {
    type: String,
    index: true,
    required: true,
  },
  jobId: {
    type: String,
    index: true,
  },
  phoneNumber: {
    type: String,
  },
  expectedSalary: {
    type: String,
  },
  salaryCurrency: {
    type: String,
  },
  name: {
    type: String,
  },
  resume: {
    type: String,
  },
  pitch: {
    type: String,
  },
  questionnaireAnswersId: {
    type: String,
  },
};

var JobApplicationSchema = new mongoose.Schema(JobApplicationFields, {
  timestamps: {
    createdAt: "createdat",
    updatedAt: "updatedat",
    autoCreate: true,
  },
});

JobApplicationSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

//CandidateSchema.plugin(findOrCreate);

JobApplicationSchema.plugin(normalize); //replace _id with id and remove v

var JobApplication = mongoose.model("JobApplication", JobApplicationSchema);

export default JobApplication;

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
  resume: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  expectedSalary: {
    type: String,
  },
  name: {
    type: String,
  },
  pitch: {
    type: String,
  },
  questionerAnswersId: {
    type: String,
  },
};

var JobApplicationSchema = new mongoose.Schema(JobApplicationFields, {
  autoCreate: true,
});

JobApplicationSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

//CandidateSchema.plugin(findOrCreate);

JobApplicationSchema.plugin(normalize); //replace _id with id and remove v

var JobApplication = mongoose.model("JobApplication", JobApplicationSchema);

export default JobApplication;

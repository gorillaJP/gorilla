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

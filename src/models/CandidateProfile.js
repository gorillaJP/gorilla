import mongoose from "mongoose";
import normalize from "normalize-mongoose";
var uniqueValidator = require("mongoose-unique-validator");

/**
 * identifier is email address
 *
 */
var CandidateProfileFields = {
  firstname: String,
  lastname: String,
  email: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  password: String,
};

var CandidateSchema = new mongoose.Schema(CandidateProfileFields, {
  autoCreate: true,
});

CandidateSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

CandidateSchema.plugin(normalize); //replace _id with id and remove v

var Candidate = mongoose.model("CandidateProfile", CandidateSchema);

export default Candidate;

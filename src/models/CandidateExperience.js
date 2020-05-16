import mongoose from "mongoose";
import normalize from "normalize-mongoose";
var uniqueValidator = require("mongoose-unique-validator");

/**
 * identifier is email address
 *
 * One candidate can have multipe work experience
 *
 */
var CandidateExperienceDef = {
  email: {
    type: String,
    index: true,
    required: true,
  },
  order: Number, //for UI
  jobtitle: String,
  organization: String,
  location: String,
  startDate: Date,
  endDate: Date,
  details: String,
  deleted: Boolean,
};

var Schema = new mongoose.Schema(CandidateExperienceDef, {
  autoCreate: true,
});

Schema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

Schema.plugin(normalize); //replace _id with id and remove v

var CandidateExperience = mongoose.model("CandidateExperience", Schema);

export default CandidateExperience;

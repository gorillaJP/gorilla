import mongoose from "mongoose";
import normalize from "normalize-mongoose";
var uniqueValidator = require("mongoose-unique-validator");

/**
 * identifier is email address
 *
 * One candidate can have multipe qualifications
 *
 */
var CandidateEducationDef = {
  email: {
    type: String,
    index: true,
    required: true,
  },
  order: Number, //for UI
  qualification: String,
  institite: String,
  startdate: Date,
  enddate: Date,
  marks: String,
  details: String,
  deleted: Boolean,
};

var Schema = new mongoose.Schema(CandidateEducationDef, {
  autoCreate: true,
});

Schema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

Schema.plugin(normalize); //replace _id with id and remove v

var CandidateEducation = mongoose.model("CandidateEducation", Schema);

export default CandidateEducation;

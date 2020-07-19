import mongoose from "mongoose";
import normalize from "normalize-mongoose";
var uniqueValidator = require("mongoose-unique-validator");
var findOrCreate = require("mongoose-findorcreate");

/**
 * identifier is email address
 *
 */

var CandidateProfileFields = {
  completeness: {
    type: String,
    default: "60%",
  },
  nextAction: {
    type: String,
    default: "Add skills",
  },
  firstname: String,
  lastname: String,
  email: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  emailverified: {
    default: false,
  },
  emailverifysecret: {
    type: String,
    select: false,
  },
  phonenumber: String,
  phonenumberverified: {
    default: false,
  },
  phonenumberverifysecret: {
    type: String,
    select: false,
  },
  password: { type: String, select: false },
  createdthrough: {
    type: String,
    select: false,
  },
  homephonenumber: String,
  birthdate: Date,
  address: String,
  education: [
    {
      order: Number,
      qualification: String,
      institite: String,
      startdate: Date,
      enddate: Date,
      marks: String,
      details: String,
      deleted: Boolean,
    },
  ],
  experience: [
    {
      order: Number, //for UI
      jobtitle: String,
      organization: String,
      location: String,
      startDate: Date,
      endDate: Date,
      details: String,
      deleted: Boolean,
    },
  ],
  resumes: [
    {
      label: String,
      file: String,
    },
  ],
  skills: [String],
  languages: [String],
};

var CandidateSchema = new mongoose.Schema(CandidateProfileFields, {
  autoCreate: true,
});

CandidateSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

CandidateSchema.plugin(findOrCreate);

CandidateSchema.plugin(normalize); //replace _id with id and remove v

var Candidate = mongoose.model("CandidateProfile", CandidateSchema);

export default Candidate;

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
  firstName: String,
  lastName: String,
  profileImage: String,
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
  //  homephonenumber: String,
  //  birthdate: Date,
  //  address: String,
  personalInfo: {
    homeTown: String,
    address: String,
    mobilePhoneNumber: String,
    homePhoneNumber: String,
    dateOfBirth: Date,
    gender: String,
    martialStatus: String,
    introduction: String,
  },
  jobPreference: {
    industry: String,
    category: String,
    jobType: String,
    role: String,
    preferredLocation: String,
    expectedSalary: String,
    expectedSalaryCurrency: String,
  },
  educations: [
    {
      order: Number,
      qualification: String,
      institute: String,
      marks: String,
      startDate: Date,
      endDate: Date,
      details: String,
    },
  ],
  experiences: [
    {
      order: Number, //for UI
      jobtitle: String,
      organization: String,
      monthlySalary: Number,
      salaryCurrency: String,
      startDate: Date,
      endDate: Date,
      details: String,
      location: String,
    },
  ],
  awards: [
    {
      order: Number,
      name: String,
      organization: String,
      date: Date,
      details: String,
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

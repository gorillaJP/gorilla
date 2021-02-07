import mongoose from "mongoose";
import normalize from "normalize-mongoose";
var uniqueValidator = require("mongoose-unique-validator");

var FollowedCompaniesFields = {
  candidateEmail: {
    type: String,
    required: true,
  },
  companyId: String,
};

var FollowedCompaniesSchama = new mongoose.Schema(FollowedCompaniesFields, {
  timestamps: {
    createdAt: "createdat",
    updatedAt: "updatedat",
    autoCreate: true,
  },
});

FollowedCompaniesSchama.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

FollowedCompaniesSchama.plugin(normalize); //replace _id with id and remove v

var FollowedCompanies = mongoose.model(
  "FollowedCompanies",
  FollowedCompaniesSchama
);

export default FollowedCompanies;

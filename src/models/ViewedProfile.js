import mongoose from "mongoose";
import normalize from "normalize-mongoose";
var uniqueValidator = require("mongoose-unique-validator");

var ViewedCompaniesFields = {
  candidateEmail: {
    type: String,
    required: true,
  },
  companyId: String,
};

var ViewedCompaniesSchama = new mongoose.Schema(ViewedCompaniesFields, {
  timestamps: {
    createdAt: "createdat",
    updatedAt: "updatedat",
    autoCreate: true,
  },
});

ViewedCompaniesSchama.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

ViewedCompaniesSchama.plugin(normalize); //replace _id with id and remove v

var ViewedCompanies = mongoose.model("ViewedCompanies", ViewedCompaniesSchama);

export default ViewedCompanies;

import mongoose from "mongoose";
var uniqueValidator = require("mongoose-unique-validator");
import normalize from "normalize-mongoose";

var CompanyProfile = {
  name: {
    type: String,
    unique: true
  },
  logo: String,
  email: String,
  phonenumber: String,
  description: String
};

var CompanyProfileSchema = new mongoose.Schema(CompanyProfile, {
  autoCreate: true
});

CompanyProfileSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique."
});

CompanyProfileSchema.plugin(normalize); //replace _id with id and remove v

var Company = mongoose.model("CompanyProfile", CompanyProfileSchema);

export default Company;

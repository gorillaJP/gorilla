import mongoose from "mongoose";
import normalize from "normalize-mongoose";
var uniqueValidator = require("mongoose-unique-validator");

var EmployerFields = {
  firstname: String,
  lastname: String,
  email: {
    type: String,
    index: true,
    unique: true,
  },
  phonenumber: String,
  password: String,
  companyname: String,
  company: {
    id: String,
  },
};

var employerProfileSchema = new mongoose.Schema(EmployerFields, {
  autoCreate: true,
});

employerProfileSchema.plugin(uniqueValidator, {
  message: "{PATH} | {VALUE}  | {TYPE}",
});

employerProfileSchema.plugin(normalize); //replace _id with id and remove v

var Employer = mongoose.model("EmployerProfile", employerProfileSchema);

export default Employer;

import mongoose from "mongoose";
var uniqueValidator = require("mongoose-unique-validator");

var seeker = {
  username: String,
  password: String,
  email: String,
  firstname: String,
  surname: String,
  district: String,
  city: String,
  mobilenumber: String,
  qualifications: Array,
  skills: Array
};

var seekerSchema = new mongoose.Schema(seeker, { autoCreate: true });

seekerSchema.plugin(uniqueValidator);

var Seeker = mongoose.model("Seekers", seekerSchema);

export default Seeker;

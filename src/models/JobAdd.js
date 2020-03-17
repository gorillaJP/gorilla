import mongoose from "mongoose";
import esClient from "../util/esClient";
import mongoosastic from "mongoosastic";

var jobAdd = {
  company: {
    type: String
  },
  title: {
    type: String
  },
  overview: {
    type: String
  },
  description: {
    type: String
  },
  location: {
    type: String
  },
  experiencemin: {
    type: Number
  },
  experiencemax: {
    type: Number
  },
  type: {
    //Perm / Contract / Parttimee
    type: String
  },
  level: {
    //Fresher, experiance mid level, Senior level
    type: String
  },
  industry: {
    type: String
  },
  salaryMin: {
    type: Number
  },
  salarymax: {
    type: Number
  },
  bonus: {
    type: Number
  },
  bonusType: {
    //per year, per quater, per month
    type: String
  },
  expireDate: {
    type: Date
  },
  notifyEmail: {
    type: String
  },
  redirectURL: {
    type: String
  },
  skills: {
    type: Array
  }
};

var jobAddSchema = new mongoose.Schema(jobAdd, {
  timestamps: { createdAt: "createdat", updatedAt: "updatedat" }
});

jobAddSchema.plugin(mongoosastic, {
  indexAutomatically: false, // the application does not write the record to ES. sycn happen at the back end
  esClient: esClient,
  index: "gorilla.jobadds",
  type: "_doc"
});

var Jobs = mongoose.model("jobadd", jobAddSchema);

export default Jobs;

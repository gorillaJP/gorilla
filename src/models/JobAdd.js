import mongoose from "mongoose";
import esClient from "../util/esClient";

var jobAdd = {
  company: {
    type: String,
  },
  companyid: {
    type: String,
  },
  title: {
    type: String,
  },
  overview: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  experiencemin: {
    type: Number,
  },
  experiencemax: {
    type: Number,
  },
  type: {
    //Perm / Contract / Parttimee
    type: String,
  },
  level: {
    //Fresher, experiance mid level, Senior level
    type: String,
  },
  industry: {
    type: String,
  },
  category: {
    type: String,
  },
  salaryMin: {
    type: Number,
  },
  salarymax: {
    type: Number,
  },
  bonus: {
    type: Number,
  },
  bonusType: {
    //per year, per quater, per month
    type: String,
  },
  expireDate: {
    type: Date,
  },
  notifyEmail: {
    type: String,
  },
  redirectURL: {
    type: String,
  },
  skills: {
    type: Array,
  },
  isfeatured: {
    type: Boolean,
    default: false,
  },
  applyExternally: {
    type: Boolean,
    default: false,
  },
  applyExternalUrl: {
    type: String,
    default: null,
  },
  isPitchRequired: {
    type: Boolean,
    default: true,
  },
  questionnaireId: {
    type: String,
    default: true,
  },
};

var jobAddSchema = new mongoose.Schema(jobAdd, {
  timestamps: { createdAt: "createdat", updatedAt: "updatedat" },
});

jobAddSchema.static("esSearch", function (query, cb) {
  esClient.search(
    {
      index: "gorilla.jobadds",
      type: "_doc",
      body: query,
    },
    cb
  );
});

var Jobs = mongoose.model("jobadd", jobAddSchema);

export default Jobs;

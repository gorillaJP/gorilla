import mongoose from "mongoose";
import normalize from "normalize-mongoose";
var uniqueValidator = require("mongoose-unique-validator");
//var findOrCreate = require("mongoose-findorcreate");

var JobApplicationFields = {
  email: {
    type: String,
    index: true,
    required: true,
  },
  jobId: {
    type: String,
    index: true,
  },
  jobAdd: {
    _id: false,
    hasApplied: {
      type: Boolean,
    },
    hasSaved: {
      type: Boolean,
    },
    _id: {
      type: String,
    },
    title: {
      type: String,
    },
    company: {
      type: String,
    },
    companyid: {
      type: String,
    },
    companylogo: {
      type: String,
    },
    location: {
      type: String,
    },
    type: {
      //Perm / Contract / Parttimee
      type: String,
    },
    salaryMin: {
      type: Number,
    },
    salarymax: {
      type: Number,
    },
  },
  phoneNumber: {
    type: String,
  },
  expectedSalary: {
    type: String,
  },
  salaryCurrency: {
    type: String,
  },
  name: {
    type: String,
  },
  resume: {
    type: String,
  },
  pitch: {
    type: String,
  },
  questionnaireAnswer: {
    questionnaireId: {
      type: String,
    },
    questions: [
      {
        order: {
          type: Number,
          default: 0,
        },
        type: {
          type: String,
          enum: ["single_select", "multi_select", "essay"],
          default: "essay",
        },
        desc: {
          type: String,
        },
        answerOptions: [
          {
            desc: {
              type: String,
            },
          },
        ],
        answer: {},
      },
    ],
  },
};

var JobApplicationSchema = new mongoose.Schema(JobApplicationFields, {
  timestamps: {
    createdAt: "createdat",
    updatedAt: "updatedat",
    autoCreate: true,
  },
});

JobApplicationSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

//CandidateSchema.plugin(findOrCreate);

JobApplicationSchema.plugin(normalize); //replace _id with id and remove v

var JobApplication = mongoose.model("JobApplication", JobApplicationSchema);

export default JobApplication;

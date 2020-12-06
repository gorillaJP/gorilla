import mongoose from "mongoose";
import normalize from "normalize-mongoose";

var questionnaireanswersFields = {
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
      answer: {
        type: String,
      },
    },
  ],
};

var questionnaireanswerSchema = new mongoose.Schema(
  questionnaireanswersFields,
  {
    timestamps: {
      createdAt: "createdat",
      updatedAt: "updatedat",
    },
  }
);

questionnaireanswerSchema.plugin(normalize); //replace _id with id and remove v

var Questineranswers = mongoose.model(
  "questionnaireanswer",
  questionnaireanswerSchema
);

export default Questineranswers;

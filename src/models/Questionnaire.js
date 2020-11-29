import mongoose from "mongoose";
import normalize from "normalize-mongoose";

var questionnaireFields = {
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
    },
  ],
};

var questionnaireSchema = new mongoose.Schema(questionnaireFields, {
  timestamps: {
    createdAt: "createdat",
    updatedAt: "updatedat",
  },
});

questionnaireSchema.plugin(normalize); //replace _id with id and remove v

var Questiner = mongoose.model("questionnaire", questionnaireSchema);

export default Questiner;

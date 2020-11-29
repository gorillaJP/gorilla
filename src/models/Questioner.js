import mongoose from "mongoose";
import normalize from "normalize-mongoose";

var questionerFields = {
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

var questionerSchema = new mongoose.Schema(questionerFields, {
  timestamps: {
    createdAt: "createdat",
    updatedAt: "updatedat",
  },
});

questionerSchema.plugin(normalize); //replace _id with id and remove v

var Questiner = mongoose.model("Questioner", questionerSchema);

export default Questiner;

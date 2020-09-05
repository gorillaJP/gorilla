import mongoose from "mongoose";

var metaData = {
  name: {
    type: String,
    index: true,
    unique: true,
  },
};

var metaskill = new mongoose.Schema(metaData);

var Meta_Skill = mongoose.model("metaskills", metaskill);

export default Meta_Skill;

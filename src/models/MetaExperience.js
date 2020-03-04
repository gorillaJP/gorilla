import mongoose from "mongoose";

var metaData = {
  name: {
    type: String,
    index: true,
    unique: true
  }
};

var metaExperience = new mongoose.Schema(metaData);

var MetaExperiance = mongoose.model("metaexperience", metaExperience);

export default MetaExperiance;

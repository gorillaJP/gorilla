import mongoose from "mongoose";

var metaData = {
  name: {
    type: String,
    index: true,
    unique: true
  }
};

var metaJobType = new mongoose.Schema(metaData);

var Meta_JobType = mongoose.model("metajobtypes", metaJobType);

export default Meta_JobType;

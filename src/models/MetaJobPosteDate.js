import mongoose from "mongoose";

var metaData = {
  name: {
    type: String,
    index: true,
    unique: true
  }
};

var metaJobPosteDateSchema = new mongoose.Schema(metaData);

var MetaJobPosteDate = mongoose.model(
  "metajobpostdate",
  metaJobPosteDateSchema
);

export default MetaJobPosteDate;

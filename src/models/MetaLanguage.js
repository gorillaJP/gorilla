import mongoose from "mongoose";

var metaData = {
  name: {
    type: String,
    index: true,
    unique: true,
  },
};

var metalanguage = new mongoose.Schema(metaData);

var Meta_Language = mongoose.model("metalanguage", metalanguage);

export default Meta_Language;

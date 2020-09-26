import mongoose from "mongoose";

var metaData = {
  name: {
    type: String,
    index: true,
    unique: true,
  },
};

var metaCurrency = new mongoose.Schema(metaData);

var Meta_Currency = mongoose.model("metacurrency", metaCurrency);

export default Meta_Currency;

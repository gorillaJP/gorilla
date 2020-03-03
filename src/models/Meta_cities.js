import mongoose from "mongoose";

var metaData = {
  name: {
    type: String,
    index: true,
    unique: true
  },
  province: {
    type: String
  }
};

var metaCitiesSchema = new mongoose.Schema(metaData);

var Meta_cities = mongoose.model("metacities", metaCitiesSchema);

export default Meta_cities;

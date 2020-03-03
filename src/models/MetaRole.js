import mongoose from "mongoose";

var metaData = {
  name: {
    type: String,
    index: true,
    unique: true
  }
};

var metarole = new mongoose.Schema(metaData);

var Meta_Role = mongoose.model("metarole", metarole);

export default Meta_Role;

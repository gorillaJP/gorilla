import mongoose from "mongoose";
import esClient from "../util/esClient";
import mongoosastic from "mongoosastic";

var autocomplte = {
  name: {
    type: String
  }
};

var autoComplteSchema = new mongoose.Schema(autocomplte, {
  timestamps: { createdAt: "createdat", updatedAt: "updatedat" }
});

autoComplteSchema.plugin(mongoosastic, {
  indexAutomatically: false, // the application does not write the record to ES. sycn happen at the back end
  esClient: esClient,
  index: "gorilla.autocomplete",
  type: "_doc"
});

var AutoCompltes = mongoose.model("autocomplete", autoComplteSchema);

export default AutoCompltes;

import mongoose from "mongoose";
import esClient from "../util/esClient";

var autocomplte = {
  name: {
    type: String
  }
};

var autoComplteSchema = new mongoose.Schema(autocomplte, {
  timestamps: { createdAt: "createdat", updatedAt: "updatedat" }
});

autoComplteSchema.static("esSearch", function(query, cb) {
  esClient.search(
    {
      index: "gorilla.autocomplete",
      type: "_doc",
      body: query
    },
    cb
  );
});

var AutoCompltes = mongoose.model("autocomplete", autoComplteSchema);

export default AutoCompltes;

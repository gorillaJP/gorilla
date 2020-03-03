import mongoose from "mongoose";

var metaData = {
  name: {
    type: String,
    index: true,
    unique: true
  }
};

var metasalary = new mongoose.Schema(metaData);

var Meta_Salary = mongoose.model("metasalary", metasalary);

export default Meta_Salary;

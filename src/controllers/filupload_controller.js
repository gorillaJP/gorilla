import logger from "../util/logger";
import formidable from "formidable";
import { success, error } from "../util/constants";
import approotPath from "app-root-path";
import { getMaxListeners } from "cluster";
import { app } from "../config";
import { completionSuggester } from "elastic-builder";

const fileUpload = (req, res) => {
  const category = req.params.category;

  //validation for the category
  if (category) {
    if (category != "resume" && category != "image") {
      res.status(400).send();
      return;
    }
  }

  var form = new formidable.IncomingForm({
    uploadDir: app.uploadDir + (category ? "/" + category : ""),
    //keepExtensions: true,   //here the extension is taken from the request Content-Disposition: form-data; name="image"; filename="1.png"
    maxFileSizeA: 4 * 1024 * 1024,
    maxFieldsSize: 5 * 1024 * 1024,
  });

  //rename the incoming file to the file's name
  form.on("fileBegin", function (name, file) {
    if (file) {
      file.path = file.path + file.name;
    }
  });

  form.parse(req, function (err, fields, files) {
    if (err) {
      logger.error(err);
      res.send(new Error("file upload failed"));
    } else if (files && files.file) {
      files.file.path = files.file.path.split("/").pop(); //get only the file name
      res.send(
        success({
          file: (category ? category + "/" : "") + files.file.path,
          label: files.file.name,
        })
      );
      //res.end(JSON.stringify({ fields, files }, null, 2));
    } else {
      log.error("files or files.file not found");
      res.send(new Error("file upload failed"));
    }
  });
};

export default { fileUpload };

import logger from "../util/logger";
import formidable from "formidable";
import { success, error } from "../util/constants";
import approotPath from "app-root-path";
import { getMaxListeners } from "cluster";

const fileUpload = (req, res) => {
  //const rootDir = path.resolve(__dirname);
  const uploadDir = "/apps/images/gorilla.lk";

  //initiation formidable ( +validations)
  var form = new formidable.IncomingForm({
    uploadDir: uploadDir,
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
          file: files.file.path,
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

/**
 form
    .on('error', function(err) {
        throw err;
    })

    .on('field', function(field, value) {
        //receive form fields here
    })

    // this is where the renaming happens 
    .on ('fileBegin', function(name, file){
      //rename the incoming file to the file's name
      file.path = form.uploadDir + "/" + file.name;
})

.on('file', function(field, file) {
  //On file received
})

.on('progress', function(bytesReceived, bytesExpected) {
  //self.emit('progess', bytesReceived, bytesExpected)

  var percent = (bytesReceived / bytesExpected * 100) | 0;
  process.stdout.write('Uploading: %' + percent + '\r');
})

.on('end', function() {


});

form.parse(req); 
 * 
 */

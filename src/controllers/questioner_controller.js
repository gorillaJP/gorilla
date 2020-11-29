import Questioner from "../models/Questioner";
import { success, error } from "../util/constants";
import HttpStatus from "http-status-codes";
import Questiner from "../models/Questioner";

const create_questioner = (req, res) => {
  const questioner = new Questiner(req.body);

  questioner
    .save()
    .then((q) => {
      res.send(q);
    })
    .catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

const get_questioner_by_id = (req, res) => {
  Questioner.findById(req.params.id)
    .exec()
    .then((data) => {
      res.status(200).send(success(data));
    })
    .catch((err) => {
      console.log(err);
      res.status(HttpStatus.BAD_REQUEST).send(error());
    });
};

export default { create_questioner, get_questioner_by_id };

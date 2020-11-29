import questionnaire from "../models/questionnaire";
import { success, error } from "../util/constants";
import HttpStatus from "http-status-codes";
import Questiner from "../models/questionnaire";

const create_questionnaire = (req, res) => {
  const questionnaire = new Questiner(req.body);

  questionnaire
    .save()
    .then((q) => {
      res.send(q);
    })
    .catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

const get_questionnaire_by_id = (req, res) => {
  questionnaire
    .findById(req.params.id)
    .exec()
    .then((data) => {
      res.status(200).send(success(data));
    })
    .catch((err) => {
      console.log(err);
      res.status(HttpStatus.BAD_REQUEST).send(error());
    });
};

export default { create_questionnaire, get_questionnaire_by_id };

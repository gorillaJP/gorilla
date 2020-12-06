import questionnaire from "../models/Questionnaire";
import QuestionnaireAnswer from "../models/QuestionnaireAnswer";
import { success, error } from "../util/constants";
import HttpStatus from "http-status-codes";
import Questiner from "../models/Questionnaire";

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

const create_questionnaireAnswer = (req, res) => {
  const questionnaireAnswer = new QuestionnaireAnswer(req.body);

  questionnaireAnswer
    .save()
    .then((q) => {
      res.send(success(q));
    })
    .catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error(err));
    });
};

export default {
  create_questionnaire,
  get_questionnaire_by_id,
  create_questionnaireAnswer,
};

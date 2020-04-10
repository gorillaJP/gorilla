import AuthUser from "../models/AuthUser";
import { success, error } from "../util/constants";
import HttpStatus from "http-status-codes";

const isValueTaken = (req, res) => {
  AuthUser.countDocuments({ [req.params.prop]: req.params.value })
    .exec()
    .then((data) => {
      console.log(req.params.value);

      res.send(success({ count: data }));
    })
    .catch((err) => {
      console.log(err);
      res.status(HttpStatus.BAD_REQUEST).send(resp_error);
    });
};

export default { isValueTaken };

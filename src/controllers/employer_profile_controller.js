import EmployerProfile from "../models/EmployerProfile";
import CompanyProfile from "../models/CompanyProfile";
import { success, error } from "../util/constants";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";

/**
 * Save the Employee and company
 *
 * If the comapny is new => add it
 *
 */
const registerEmployer = (req, res) => {
  mongoose.startSession().then(session => {
    session.startTransaction();
    const employerProfile = new EmployerProfile(req.body);
    var companyIdPromise;
    //if the company is new => add it first
    if (!employerProfile.company.id) {
      //if the company is not yet registered => register it first
      companyIdPromise = new CompanyProfile(req.body.company)
        .save({ session })
        .then(company => {
          return company;
        })
        //Ex : duplicate company name
        .catch(err => {
          session.abortTransaction();
          res
            .status(HttpStatus.BAD_REQUEST)
            .send(
              error(
                err && err.errors
                  ? "company " + err.errors[Object.keys(err.errors)[0]].message
                  : "Error at save company"
              )
            );
          throw err;
        });
    } else {
      companyIdPromise = Promise.resolve(req.body.company);
    }

    //now save the employer profile
    companyIdPromise
      .then(company => {
        employerProfile.company.id = company.id;
        employerProfile
          .save({ session })
          .then(employer => {
            employer._doc.company = company;
            delete employer._doc.password;
            session.commitTransaction();
            res.status(HttpStatus.OK).send(success(employer));
          })
          //Ex : If employer email is already registered
          .catch(err => {
            session.abortTransaction();
            res
              .status(HttpStatus.BAD_REQUEST)
              .send(
                error(
                  err && err.errors
                    ? "employee " +
                        err.errors[Object.keys(err.errors)[0]].message
                    : "Error at save Employee"
                )
              );
          });
      })
      .catch(err => {
        console.log(err);
      }); //Id promise is failed. handled at the top
  });
};

export default { registerEmployer };

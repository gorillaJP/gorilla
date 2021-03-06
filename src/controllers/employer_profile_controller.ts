import EmployerProfile from "../models/EmployerProfile";
import CompanyProfile from "../models/CompanyProfile";
import { success, error } from "../util/constants";
import * as HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import { Email, emailSend, EmailTemeplate } from "../util/emailer";
import { mongooseErrorToRes } from "../models/MongoUtil";

/**
 * Save the Employee and company
 *
 * If the comapny is new => add it
 *
 */
const registerEmployer = (req, res) => {
  mongoose.startSession().then((session) => {
    session.startTransaction();
    const employerProfile = new EmployerProfile(req.body);
    var companyIdPromise;
    //if the company is new => add it first
    if (
      !employerProfile.companies ||
      employerProfile.companies.length == 0 ||
      !employerProfile.companies[0].id
    ) {
      //if the company is not yet registered => register it first
      companyIdPromise = new CompanyProfile(req.body.companies[0])
        .save({ session })
        .then((company) => {
          return company;
        })
        //Ex : duplicate company name
        .catch((err) => {
          session.abortTransaction();
          res
            .status(HttpStatus.BAD_REQUEST)
            .send(error(mongooseErrorToRes("company", err)));
          throw err; //this is because transaction should be rolled back (below)
        });
    } else {
      companyIdPromise = Promise.resolve(req.body.companies[0]);
    }

    //now save the employer profile
    companyIdPromise
      .then((company) => {
        employerProfile.companies = [{ id: company.id }];
        employerProfile
          .save({ session })
          .then((employer) => {
            employer._doc.companies[0] = company;
            delete employer._doc.password;
            session.commitTransaction();
            res.status(HttpStatus.OK).send(success(employer));
            sendEmail(employer);
          })
          //Ex : If employer email is already registered
          .catch((err) => {
            session.abortTransaction();
            res
              .status(HttpStatus.BAD_REQUEST)
              .send(error(mongooseErrorToRes("", err)));
          });
      })
      .catch((err) => {
        console.log(err);
      }); //Id promise is failed. handled at the top
  });
};

let sendEmail = (employer): void => {
  const email: Email = {
    to: employer.email,
    template: EmailTemeplate.SIGNUP_EMPLOYER,
    data: employer,
  };
  emailSend(email);
};

export default { registerEmployer };

import nodemailer from "nodemailer";
import { mailerConf } from "../config";
import logger from "./logger";
import * as path from "path";
import EmailTemplateEngine from "email-templates";

//node mailer transporter
let nodemailerTranspoter = nodemailer.createTransport({
  host: mailerConf.host,
  port: mailerConf.port,
  secure: mailerConf.secure, // true for 465, false for other ports
  auth: {
    user: mailerConf.user,
    pass: mailerConf.pass,
  },
});

const emailTemplateEngine = new EmailTemplateEngine({
  message: {
    from: mailerConf.from,
  },
  // send: true // uncomment below to send emails in development/test env:
  transport: nodemailerTranspoter,
});

//returns a promise
const emailSend = (email: Email) => {
  emailTemplateEngine
    .send({
      template: email.template,
      message: {
        to: email.to,
      },
      locals: email.data, //values to fill placeholders in template
    })
    .then((res) => logger.info("email sent messageId:" + res.messageId))
    .catch((err) => logger.error(err));
};

type Email = {
  to: String;
  template: EmailTemeplate;
  data: Object;
};

enum EmailTemeplate {
  SIGNUP_CANDIDATE = "signup_candidate",
  SIGNUP_EMPLOYER = "signup_employer",
  SIGNUP_EMPLOYER_VERIFIED = "signup_employer_verified",
  PASSWORD_FORGOTTON = "password_forgotton",
}

export { Email, emailSend, EmailTemeplate };

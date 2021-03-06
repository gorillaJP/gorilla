import winston from "winston";
const logger = winston.createLogger({
  level: "debug",
  format: winston.format.simple(),
  //defaultMeta: { service: 'service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({
      filename: "./log/error.log",
      level: "error"
    }),
    new winston.transports.File({
      filename: "./log/application.log",
      level: "info"
    }),
    new winston.transports.File({
      filename: "./log/debug.log",
      level: "debug"
    })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

export default logger;

import winston from "winston";
import config from "../config/config.js";

const loggerLevel = config.env_mode === "development" ? "debug" : "info";

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
};

const logger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: loggerLevel,
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: "error",
    }),
  ],
});

export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(`${req.method} in ${req.url} - ${new Date().toLocaleDateString()}`)
  next();
};
